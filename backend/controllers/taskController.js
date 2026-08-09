const Task = require('../models/Task');
const { emitTaskEvent } = require('../services/socketService');

// @desc Get all tasks for logged-in user with search, filter, and sort
// @route GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { search, status, priority, category, sortBy, order } = req.query;

    let query = { userId };

    // Search query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      if (status === 'Overdue') {
        query.dueDate = { $lt: new Date() };
        query.status = { $ne: 'Completed' };
      } else {
        query.status = status;
      }
    }

    // Priority filter
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default newest
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      if (sortBy === 'dueDate') {
        sortOptions = { dueDate: sortOrder, createdAt: -1 };
      } else if (sortBy === 'priority') {
        // Priority custom order handling handled in memory if needed or title/createdAt
        sortOptions = { priority: sortOrder, createdAt: -1 };
      } else if (sortBy === 'title') {
        sortOptions = { title: sortOrder };
      } else if (sortBy === 'oldest') {
        sortOptions = { createdAt: 1 };
      }
    }

    const tasks = await Task.find(query).sort(sortOptions);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single task by ID
// @route GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create new task
// @route POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      category,
      tags,
      dueDate,
      dueTime,
      reminder,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'To Do',
      priority: priority || 'Medium',
      category: category || 'Personal',
      tags: Array.isArray(tags) ? tags : [],
      dueDate: dueDate ? new Date(dueDate) : null,
      dueTime: dueTime || '',
      reminder: reminder ? new Date(reminder) : null,
      userId: req.user._id,
      completedAt: status === 'Completed' ? new Date() : null,
    });

    emitTaskEvent(req.user._id.toString(), 'task:created', task);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update task details
// @route PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }

    const {
      title,
      description,
      status,
      priority,
      category,
      tags,
      dueDate,
      dueTime,
      reminder,
    } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (tags !== undefined) task.tags = Array.isArray(tags) ? tags : [];
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (dueTime !== undefined) task.dueTime = dueTime;
    if (reminder !== undefined) task.reminder = reminder ? new Date(reminder) : null;

    if (status !== undefined && status !== task.status) {
      task.status = status;
      if (status === 'Completed') {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }

    const updatedTask = await task.save();

    emitTaskEvent(req.user._id.toString(), 'task:updated', updatedTask);

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Patch task status (e.g. quick checkbox toggle)
// @route PATCH /api/tasks/:id/status
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['To Do', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status is required' });
    }

    let task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }

    task.status = status;
    task.completedAt = status === 'Completed' ? new Date() : null;

    const updatedTask = await task.save();

    emitTaskEvent(req.user._id.toString(), 'task:updated', updatedTask);

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete task
// @route DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }

    emitTaskEvent(req.user._id.toString(), 'task:deleted', { id: req.params.id });

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

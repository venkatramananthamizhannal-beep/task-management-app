const Notification = require('../models/Notification');
const Task = require('../models/Task');

// @desc Get user notifications (scans tasks for upcoming due dates & overdue items)
// @route GET /api/notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Scan user's tasks to generate notifications if needed
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const pendingTasks = await Task.find({
      userId,
      status: { $ne: 'Completed' },
      dueDate: { $ne: null },
    });

    for (const task of pendingTasks) {
      if (task.dueDate < now) {
        // Overdue check
        const exists = await Notification.findOne({
          userId,
          taskId: task._id,
          type: 'overdue',
        });
        if (!exists) {
          await Notification.create({
            userId,
            taskId: task._id,
            message: `Task "${task.title}" is overdue!`,
            type: 'overdue',
          });
        }
      } else if (task.dueDate <= tomorrow) {
        // Due soon check
        const exists = await Notification.findOne({
          userId,
          taskId: task._id,
          type: 'deadline',
        });
        if (!exists) {
          await Notification.create({
            userId,
            taskId: task._id,
            message: `Task "${task.title}" is due soon (${new Date(task.dueDate).toLocaleDateString()}).`,
            type: 'deadline',
          });
        }
      }
    }

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(30);

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Mark notification as read
// @route PATCH /api/notifications/:id/read
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

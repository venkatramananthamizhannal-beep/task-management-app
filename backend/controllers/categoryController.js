const Category = require('../models/Category');
const Task = require('../models/Task');

// @desc Get all user categories with task statistics
// @route GET /api/categories
exports.getCategories = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const categories = await Category.find({ userId }).sort({ createdAt: 1 });

    // Calculate task counts per category
    const categoriesWithStats = await Promise.all(
      categories.map(async (cat) => {
        const totalTasks = await Task.countDocuments({ userId, category: cat.name });
        const completedTasks = await Task.countDocuments({ userId, category: cat.name, status: 'Completed' });
        const pendingTasks = totalTasks - completedTasks;

        return {
          _id: cat._id,
          name: cat.name,
          color: cat.color,
          icon: cat.icon,
          totalTasks,
          completedTasks,
          pendingTasks,
          createdAt: cat.createdAt,
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithStats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create new custom category
// @route POST /api/categories
exports.createCategory = async (req, res, next) => {
  try {
    const { name, color, icon } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const existing = await Category.findOne({ userId: req.user._id, name: name.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      color: color || '#6366f1',
      icon: icon || 'Folder',
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: category._id,
        name: category.name,
        color: category.color,
        icon: category.icon,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        createdAt: category.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update category
// @route PUT /api/categories/:id
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, color, icon } = req.body;
    let category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found or unauthorized' });
    }

    const oldName = category.name;

    if (name && name.trim() !== oldName) {
      category.name = name.trim();
      // Update tasks associated with this category name
      await Task.updateMany(
        { userId: req.user._id, category: oldName },
        { category: name.trim() }
      );
    }

    if (color) category.color = color;
    if (icon) category.icon = icon;

    const updatedCategory = await category.save();

    res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete custom category
// @route DELETE /api/categories/:id
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found or unauthorized' });
    }

    // Move tasks in deleted category to 'Other'
    await Task.updateMany(
      { userId: req.user._id, category: category.name },
      { category: 'Other' }
    );

    res.json({
      success: true,
      message: 'Category deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

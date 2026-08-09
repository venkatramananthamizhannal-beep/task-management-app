const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');
const Category = require('../models/Category');
const Notification = require('../models/Notification');

const seedDemoData = async () => {
  try {
    const demoEmail = 'demo@taskmaster.com';
    let demoUser = await User.findOne({ email: demoEmail });

    if (!demoUser) {
      console.log('[Seed] Creating demo user account...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);

      demoUser = await User.create({
        name: 'Alex Morgan',
        email: demoEmail,
        password: hashedPassword,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      });

      // Default categories
      const categories = [
        { name: 'Personal', color: '#ec4899', icon: 'User', userId: demoUser._id },
        { name: 'Work', color: '#3b82f6', icon: 'Briefcase', userId: demoUser._id },
        { name: 'Study', color: '#8b5cf6', icon: 'BookOpen', userId: demoUser._id },
        { name: 'Development', color: '#10b981', icon: 'Code', userId: demoUser._id },
        { name: 'College', color: '#f59e0b', icon: 'GraduationCap', userId: demoUser._id },
      ];
      await Category.insertMany(categories);

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 5);

      const sampleTasks = [
        {
          title: 'Complete React Dashboard',
          description: 'Build responsive grid, integrate Recharts analytics, and polish Tailwind styling.',
          status: 'In Progress',
          priority: 'High',
          category: 'Development',
          tags: ['React', 'Tailwind', 'SaaS'],
          dueDate: today,
          dueTime: '18:00',
          userId: demoUser._id,
        },
        {
          title: 'Study React.js & State Management',
          description: 'Review Context API vs Redux Toolkit concepts and write summary notes.',
          status: 'To Do',
          priority: 'Medium',
          category: 'Study',
          tags: ['React', 'College', 'Learning'],
          dueDate: tomorrow,
          dueTime: '14:00',
          userId: demoUser._id,
        },
        {
          title: 'Submit Database Architecture Assignment',
          description: 'Upload ER diagrams and normalized schema documentation for CS401 project.',
          status: 'Completed',
          priority: 'High',
          category: 'College',
          tags: ['MongoDB', 'College', 'Assignment'],
          dueDate: yesterday,
          dueTime: '23:59',
          completedAt: yesterday,
          userId: demoUser._id,
        },
        {
          title: 'Buy components for ESP8266 project',
          description: 'Order breadboards, jumper wires, DHT11 sensors, and micro-USB cables.',
          status: 'To Do',
          priority: 'Low',
          category: 'Personal',
          tags: ['Hardware', 'IoT'],
          dueDate: nextWeek,
          dueTime: '12:00',
          userId: demoUser._id,
        },
        {
          title: 'Review System Design Principles',
          description: 'Prepare notes on scalability, load balancing, and caching strategies for technical interviews.',
          status: 'Completed',
          priority: 'High',
          category: 'Work',
          tags: ['Interview', 'Career', 'System Design'],
          dueDate: yesterday,
          completedAt: yesterday,
          userId: demoUser._id,
        },
        {
          title: 'Refactor Express Middleware & JWT Security',
          description: 'Ensure authorization checks on every route and sanitize error outputs.',
          status: 'In Progress',
          priority: 'High',
          category: 'Development',
          tags: ['Node.js', 'Express', 'JWT'],
          dueDate: today,
          dueTime: '20:00',
          userId: demoUser._id,
        },
        {
          title: 'Organize Workspace Desk & Clean Cable Layout',
          description: 'Tidy monitor cables and organize study binders.',
          status: 'Completed',
          priority: 'Low',
          category: 'Personal',
          tags: ['Productivity', 'Setup'],
          dueDate: yesterday,
          completedAt: yesterday,
          userId: demoUser._id,
        },
      ];

      await Task.insertMany(sampleTasks);

      await Notification.create([
        {
          userId: demoUser._id,
          message: 'Welcome to TaskMaster! Your workspace is ready.',
          type: 'system',
          read: false,
        },
        {
          userId: demoUser._id,
          message: 'Your task "Complete React Dashboard" is due today at 6:00 PM.',
          type: 'deadline',
          read: false,
        },
      ]);

      console.log('[Seed] Demo user and sample dataset created successfully (email: demo@taskmaster.com / password: password123)');
    }
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};

module.exports = seedDemoData;

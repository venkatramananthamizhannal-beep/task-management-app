import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import PriorityPieChart from '../components/dashboard/PriorityPieChart';
import TaskCard from '../components/tasks/TaskCard';
import TaskFormModal from '../components/tasks/TaskFormModal';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import ConfirmModal from '../components/common/ConfirmModal';
import Toast from '../components/common/Toast';
import { StatCardSkeleton, TaskCardSkeleton } from '../components/common/SkeletonLoader';
import EmptyState from '../components/common/EmptyState';
import { taskService } from '../services/taskService';
import { categoryService } from '../services/categoryService';
import { useSocket } from '../context/SocketContext';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Toasts
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const { socket } = useSocket();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [tasksRes, categoriesRes] = await Promise.all([
        taskService.getTasks(),
        categoryService.getCategories(),
      ]);
      setTasks(tasksRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setToast({ message: 'Failed to load dashboard data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Listen to Socket.IO real-time updates
  useEffect(() => {
    if (socket) {
      socket.on('task:created', (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
      });
      socket.on('task:updated', (updatedTask) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
      });
      socket.on('task:deleted', ({ id }) => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      });

      return () => {
        socket.off('task:created');
        socket.off('task:updated');
        socket.off('task:deleted');
      };
    }
  }, [socket]);

  // Statistics calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate || t.status === 'Completed') return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  // Filter Today's Tasks
  const todayTasks = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const taskDate = new Date(t.dueDate).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  const displayTodayTasks = todayTasks.length > 0 ? todayTasks : tasks.slice(0, 4);

  // Status Toggle
  const handleStatusToggle = async (id, newStatus) => {
    try {
      await taskService.updateTaskStatus(id, newStatus);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
      setToast({
        message: newStatus === 'Completed' ? 'Task completed! 🎉' : 'Task status updated.',
        type: 'success',
      });
    } catch (err) {
      setToast({ message: 'Failed to update task status', type: 'error' });
    }
  };

  // Create Task
  const handleCreateTask = async (formData) => {
    try {
      setActionLoading(true);
      const res = await taskService.createTask(formData);
      setTasks((prev) => [res.data, ...prev]);
      setCreateModalOpen(false);
      setToast({ message: 'Task created successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to create task', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Task
  const handleUpdateTask = async (formData) => {
    try {
      setActionLoading(true);
      const res = await taskService.updateTask(editTask._id, formData);
      setTasks((prev) =>
        prev.map((t) => (t._id === editTask._id ? res.data : t))
      );
      setEditTask(null);
      setToast({ message: 'Task updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update task', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Task
  const handleDeleteTask = async () => {
    try {
      setActionLoading(true);
      await taskService.deleteTask(deleteTaskId);
      setTasks((prev) => prev.filter((t) => t._id !== deleteTaskId));
      setDeleteTaskId(null);
      setToast({ message: 'Task deleted successfully.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to delete task', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notice */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Top Banner & Quick Create Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your statistics, productivity metrics, and priority tasks.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Add Task
        </button>
      </div>

      {/* 4 Dashboard Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={CheckSquare}
              trend="+12% from last week"
              color="indigo"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              icon={CheckCircle2}
              trend="+8% completed"
              color="emerald"
            />
            <StatCard
              title="In Progress"
              value={inProgressTasks}
              icon={Clock}
              trend="Active tasks"
              color="amber"
            />
            <StatCard
              title="Overdue"
              value={overdueTasks}
              icon={AlertTriangle}
              trend={overdueTasks > 0 ? 'Requires attention' : 'All clear'}
              color="rose"
            />
          </>
        )}
      </div>

      {/* Charts Section: Productivity Overview + Tasks by Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProductivityChart />
        </div>
        <div className="lg:col-span-4">
          <PriorityPieChart tasks={tasks} />
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Today's Tasks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tasks scheduled for today or needing immediate action
            </p>
          </div>

          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            View All Tasks
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </div>
        ) : displayTodayTasks.length === 0 ? (
          <EmptyState
            title="No tasks for today"
            description="You are all caught up for today! Click below to create a new task."
            actionText="Create Task"
            onAction={() => setCreateModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayTodayTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusToggle={handleStatusToggle}
                onEdit={(t) => setEditTask(t)}
                onDelete={(id) => setDeleteTaskId(id)}
                onView={(t) => setDetailTask(t)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Creation Modal */}
      <TaskFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        categories={categories}
        loading={actionLoading}
      />

      {/* Task Edit Modal */}
      <TaskFormModal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editTask}
        categories={categories}
        loading={actionLoading}
      />

      {/* Task Detail View Modal */}
      <TaskDetailModal
        isOpen={!!detailTask}
        onClose={() => setDetailTask(null)}
        task={detailTask}
        onEdit={(t) => setEditTask(t)}
        onDelete={(id) => setDeleteTaskId(id)}
        onStatusToggle={handleStatusToggle}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        loading={actionLoading}
      />
    </div>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, LayoutGrid, List } from 'lucide-react';
import TaskFilterSort from '../components/tasks/TaskFilterSort';
import TaskCard from '../components/tasks/TaskCard';
import TaskFormModal from '../components/tasks/TaskFormModal';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import ConfirmModal from '../components/common/ConfirmModal';
import Toast from '../components/common/Toast';
import { TaskCardSkeleton } from '../components/common/SkeletonLoader';
import EmptyState from '../components/common/EmptyState';
import { taskService } from '../services/taskService';
import { categoryService } from '../services/categoryService';

const TasksPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter States
  const [search, setSearch] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modals & Toasts
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchTasksAndCategories = async () => {
    try {
      setLoading(true);
      const [tasksRes, categoriesRes] = await Promise.all([
        taskService.getTasks({
          search,
          status: selectedStatus,
          priority: selectedPriority,
          category: selectedCategory,
          sortBy,
        }),
        categoryService.getCategories(),
      ]);
      setTasks(tasksRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setToast({ message: 'Failed to load tasks', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndCategories();
  }, [search, selectedStatus, selectedPriority, selectedCategory, sortBy]);

  // Handle status toggle
  const handleStatusToggle = async (id, newStatus) => {
    try {
      await taskService.updateTaskStatus(id, newStatus);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
      setToast({
        message: newStatus === 'Completed' ? 'Task marked complete!' : 'Status updated.',
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
    <div className="space-y-6">
      {/* Toast Notice */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            My Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, filter, and organize all your active work items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create Task
          </button>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <TaskFilterSort
        search={search}
        setSearch={setSearch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      {/* Task List / Grid Display */}
      {loading ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks match your filter"
          description="Try clearing search queries or filters to see more tasks, or create a new task."
          actionText="Create New Task"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {tasks.map((task) => (
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

      {/* Create Task Modal */}
      <TaskFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        categories={categories}
        loading={actionLoading}
      />

      {/* Edit Task Modal */}
      <TaskFormModal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editTask}
        categories={categories}
        loading={actionLoading}
      />

      {/* Detail Task Modal */}
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

export default TasksPage;

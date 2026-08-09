import React from 'react';
import Modal from '../common/Modal';
import {
  Calendar,
  Clock,
  Tag,
  CheckCircle2,
  Edit3,
  Trash2,
  FolderKanban,
  AlertCircle,
} from 'lucide-react';

const priorityColors = {
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400',
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400',
};

const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  if (!task) return null;

  const isCompleted = task.status === 'Completed';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" maxWidth="max-w-xl">
      <div className="space-y-5">
        {/* Title & Priority Badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
              {task.category || 'General'}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {task.title}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              priorityColors[task.priority] || priorityColors.Medium
            }`}
          >
            {task.priority} Priority
          </span>
        </div>

        {/* Description */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/60 dark:border-slate-800/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Description
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {task.description || 'No description provided for this task.'}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-slate-400 block font-medium mb-1">Status</span>
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
              />
              {task.status}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-slate-400 block font-medium mb-1">Due Date</span>
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary-500" />
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : 'No deadline'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-slate-400 block font-medium mb-1">Created At</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              onStatusToggle(task._id, isCompleted ? 'In Progress' : 'Completed');
              onClose();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              isCompleted
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEdit(task);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>

            <button
              onClick={() => {
                onDelete(task._id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Edit3,
  Trash2,
  CheckCircle2,
  Circle,
  Tag,
} from 'lucide-react';

const priorityColors = {
  High: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};

const TaskCard = ({ task, onStatusToggle, onEdit, onDelete, onView }) => {
  const isCompleted = task.status === 'Completed';

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isToday = date.toDateString() === today.toDateString();
    if (isToday) return 'Today';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'Completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`group relative bg-white dark:bg-[#131926] border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
        isCompleted
          ? 'border-slate-200/60 dark:border-slate-800/60 opacity-85'
          : isOverdue
          ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/10 dark:bg-rose-950/10'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Status Checkbox & Title */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() =>
              onStatusToggle(
                task._id,
                isCompleted ? 'In Progress' : 'Completed'
              )
            }
            className="mt-0.5 text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(task)}>
            <h4
              className={`font-semibold text-base leading-snug truncate transition-all ${
                isCompleted
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
              }`}
            >
              {task.title}
            </h4>
          </div>
        </div>

        {/* Priority Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            priorityColors[task.priority] || priorityColors.Medium
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description Snippet */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 pl-8">
          {task.description}
        </p>
      )}

      {/* Tags Row */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 pl-8">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Tag className="w-3 h-3 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Info & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          {/* Category Chip */}
          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
            {task.category || 'General'}
          </span>

          {/* Due Date */}
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 font-medium ${
                isOverdue
                  ? 'text-rose-500 font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {formatDueDate(task.dueDate)}
              {task.dueTime && ` (${task.dueTime})`}
            </span>
          )}
        </div>

        {/* Edit & Delete Controls */}
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;

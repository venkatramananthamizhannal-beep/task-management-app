import React from 'react';

export const TaskCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6"></div>
      </div>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
      <div className="flex items-center gap-2 pt-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-16"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-16"></div>
      </div>
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm animate-pulse flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex-shrink-0"></div>
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 py-4 px-6 border-b border-slate-100 dark:border-slate-800/50 animate-pulse">
      <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="flex-1 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
  );
};

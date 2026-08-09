import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PieChart as PieIcon,
  Award,
} from 'lucide-react';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import PriorityPieChart from '../components/dashboard/PriorityPieChart';
import { taskService } from '../services/taskService';
import { categoryService } from '../services/categoryService';

const AnalyticsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksRes, categoriesRes] = await Promise.all([
          taskService.getTasks(),
          categoryService.getCategories(),
        ]);
        setTasks(tasksRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate || t.status === 'Completed') return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          Productivity Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics and visual trends on your task completion rates
        </p>
      </div>

      {/* Completion Highlight Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-primary-100">
            <Award className="w-4 h-4 text-amber-300" />
            Productivity Insights
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Your Completion Rate: {completionRate}%
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 max-w-xl">
            {completionRate >= 75
              ? 'Outstanding performance! You are executing tasks with high consistency.'
              : completionRate >= 50
              ? 'Great steady momentum. Focus on high priority items to push higher.'
              : 'Keep pushing forward! Clear small tasks daily to build momentum.'}
          </p>
        </div>

        {/* Big Percentage Badge */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl flex-shrink-0 z-10">
          <span className="text-3xl sm:text-4xl font-black">{completionRate}%</span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-primary-100">
            Success Rate
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Created</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{totalTasks}</p>
        </div>
        <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Completed Tasks</span>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{completedTasks}</p>
        </div>
        <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">Pending Tasks</span>
          <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{pendingTasks}</p>
        </div>
        <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Overdue Tasks</span>
          <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{overdueTasks}</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProductivityChart />
        </div>
        <div className="lg:col-span-4">
          <PriorityPieChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

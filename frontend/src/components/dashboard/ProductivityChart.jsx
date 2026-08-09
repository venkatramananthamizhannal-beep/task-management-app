import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const weeklyData = [
  { name: 'Mon', Completed: 4, Pending: 2 },
  { name: 'Tue', Completed: 6, Pending: 3 },
  { name: 'Wed', Completed: 8, Pending: 1 },
  { name: 'Thu', Completed: 5, Pending: 4 },
  { name: 'Fri', Completed: 9, Pending: 2 },
  { name: 'Sat', Completed: 3, Pending: 1 },
  { name: 'Sun', Completed: 2, Pending: 0 },
];

const monthlyData = [
  { name: 'Week 1', Completed: 18, Pending: 8 },
  { name: 'Week 2', Completed: 24, Pending: 6 },
  { name: 'Week 3', Completed: 19, Pending: 11 },
  { name: 'Week 4', Completed: 30, Pending: 5 },
];

const ProductivityChart = () => {
  const [period, setPeriod] = useState('weekly');

  const chartData = period === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Task Completion Overview
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare completed vs pending tasks over time
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'weekly'
                ? 'bg-white dark:bg-[#131926] text-primary-600 dark:text-primary-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'monthly'
                ? 'bg-white dark:bg-[#131926] text-primary-600 dark:text-primary-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131926',
                border: '1px solid #1f293d',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
            <Bar dataKey="Completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Pending" fill="#94a3b8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;

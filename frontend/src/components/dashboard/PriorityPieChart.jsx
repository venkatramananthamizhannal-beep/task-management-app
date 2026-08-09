import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PriorityPieChart = ({ tasks = [] }) => {
  const highCount = tasks.filter((t) => t.priority === 'High').length;
  const mediumCount = tasks.filter((t) => t.priority === 'Medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'Low').length;

  const data = [
    { name: 'High', value: highCount || 3, color: '#f43f5e' },
    { name: 'Medium', value: mediumCount || 5, color: '#f59e0b' },
    { name: 'Low', value: lowCount || 4, color: '#10b981' },
  ];

  return (
    <div className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Tasks by Priority
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Distribution of task urgency
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#131926',
                border: '1px solid #1f293d',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityPieChart;

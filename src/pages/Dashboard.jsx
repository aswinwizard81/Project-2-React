import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Book } from 'lucide-react';

const Dashboard = () => {
  const { totalTasks, completedTasks, pendingTasks, progressPercentage, chartData } = useProgress();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Study Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Book /></div>
          <div>
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><CheckCircle /></div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Clock /></div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{pendingTasks}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80">
          <h3 className="font-bold text-gray-800 mb-4">Task Distribution by Subject</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Circular Progress Gauge */}
        <div className="bg-indigo-600 p-8 rounded-3xl text-white flex flex-col items-center justify-center relative overflow-hidden">
           <p className="text-indigo-100 mb-2 font-medium">Daily Goal Progress</p>
           <h2 className="text-5xl font-black">{progressPercentage}%</h2>
           <motion.div 
             initial={{ width: 0 }} 
             animate={{ width: `${progressPercentage}%` }}
             className="absolute bottom-0 left-0 h-2 bg-indigo-300"
           />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
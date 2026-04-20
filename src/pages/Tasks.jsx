import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Plus, Filter } from 'lucide-react';

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('All'); // All, Pending, Completed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useStudy();
  
  // Use our custom hook for filtered/sorted tasks
  const tasks = useTasks(activeTab);

  const toggleTaskStatus = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Tasks</h1>
          <p className="text-gray-500 mt-1">Manage your daily study objectives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
        >
          <Plus size={20} /> Add Task
        </button>
      </header>

      {/* Tabs / Filter Navigation */}
      <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        {['All', 'Pending', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
            >
              <p className="text-gray-400">No {activeTab.toLowerCase()} tasks found.</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className="text-gray-300 hover:text-indigo-600 transition-colors"
                  >
                    {task.status === 'Completed' ? (
                      <CheckCircle2 className="text-green-500" size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  
                  <div>
                    <h3 className={`font-semibold ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: `${task.subject.color}15`, color: task.subject.color }}>
                        {task.subject.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} /> {task.deadline}
                      </span>
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${
                        task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal Overlay for Adding Tasks */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Study Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <TaskForm closeModal={() => setIsModalOpen(false)} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
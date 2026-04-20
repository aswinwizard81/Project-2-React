import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react'; // npm install lucide-react

const SubjectCard = ({ subject, topicCount = 0 }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative p-5 bg-white rounded-2xl shadow-sm border-l-4"
      style={{ borderLeftColor: subject.color }}
    >
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${subject.color}15` }}>
          <BookOpen size={20} style={{ color: subject.color }} />
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {topicCount} Topics
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{subject.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{subject.description}</p>
      </div>

      <button className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
        View Details <ChevronRight size={16} className="ml-1" />
      </button>
    </motion.div>
  );
};

export default SubjectCard;
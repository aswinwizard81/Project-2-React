import React from 'react';
import { useStudy } from '../context/StudyContext';
import SubjectForm from '../components/SubjectForm';
import SubjectCard from '../components/SubjectCard';
import { motion } from 'framer-motion';

const Subjects = () => {
  const { state } = useStudy();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Subjects</h1>
        <p className="text-gray-500">Organize your curriculum and track your mastery.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: The Form */}
        <div className="lg:col-span-1">
          <SubjectForm />
        </div>

        {/* Right Column: The Grid */}
        <div className="lg:col-span-2">
          {state.subjects.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400">No subjects added yet. Start by adding one!</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {state.subjects.map((subj) => (
                <SubjectCard key={subj.id} subject={subj} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;

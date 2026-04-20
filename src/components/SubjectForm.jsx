import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStudy } from '../context/StudyContext';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

// Validation Schema
const schema = yup.object({
  name: yup.string().required('Subject name is required').min(3, 'Too short!'),
  description: yup.string().max(100, 'Keep it brief'),
  color: yup.string().required(),
}).required();

const SubjectForm = () => {
  const { dispatch } = useStudy();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { color: '#3b82f6' } // Default blue
  });

  const onSubmit = (data) => {
    const newSubject = { ...data, id: uuidv4() };
    dispatch({ type: 'ADD_SUBJECT', payload: newSubject });
    reset(); // Clear form after success
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Add New Subject</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject Name</label>
        <input 
          {...register('name')} 
          className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g. Data Structures"
        />
        <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register('description')} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Theme Color</label>
        <input type="color" {...register('color')} className="h-10 w-20 block cursor-pointer" />
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Create Subject
      </button>
    </form>
  );
};

export default SubjectForm;
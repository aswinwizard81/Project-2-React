import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStudy } from '../context/StudyContext';
import { v4 as uuidv4 } from 'uuid';

const taskSchema = yup.object({
  title: yup.string().required('What do you need to do?'),
  subjectId: yup.string().required('Pick a subject'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required(),
  deadline: yup.string().required('Set a deadline'),
}).required();

const TaskForm = ({ closeModal }) => {
  const { state, dispatch } = useStudy();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema)
  });

  const onSubmit = (data) => {
    const newTask = {
      ...data,
      id: uuidv4(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-2">
      <div>
        <label className="block text-sm font-semibold text-gray-700">Task Title</label>
        <input 
          {...register('title')} 
          placeholder="e.g. Solve 10 Calculus problems"
          className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Subject</label>
          <select {...register('subjectId')} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
            <option value="">Select...</option>
            {state.subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Priority</label>
          <select {...register('priority')} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Deadline</label>
        <input type="date" {...register('deadline')} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
      </div>

      <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
        Add to Schedule
      </button>
    </form>
  );
};

export default TaskForm;
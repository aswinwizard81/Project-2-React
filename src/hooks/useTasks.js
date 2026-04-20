import { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

export const useTasks = (filterStatus = 'All') => {
  const { state } = useStudy();

  const filteredTasks = useMemo(() => {
    let tasks = [...state.tasks];

    // Join with subject data to get colors/names
    tasks = tasks.map(task => ({
      ...task,
      subject: state.subjects.find(s => s.id === task.subjectId) || { name: 'General', color: '#6366f1' }
    }));

    if (filterStatus !== 'All') {
      tasks = tasks.filter(t => t.status === filterStatus);
    }

    // Sort by priority (High -> Medium -> Low)
    const priorityMap = { High: 3, Medium: 2, Low: 1 };
    return tasks.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
  }, [state.tasks, state.subjects, filterStatus]);

  return filteredTasks;
};
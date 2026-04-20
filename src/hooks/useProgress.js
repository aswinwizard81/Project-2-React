import { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

export const useProgress = () => {
  const { state } = useStudy();

  return useMemo(() => {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = totalTasks - completedTasks;
    
    const progressPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    // Data format for Recharts Pie Chart
    const chartData = state.subjects.map(subj => ({
      name: subj.name,
      value: state.tasks.filter(t => t.subjectId === subj.id).length,
      fill: subj.color
    })).filter(d => d.value > 0);

    return { totalTasks, completedTasks, pendingTasks, progressPercentage, chartData };
  }, [state.tasks, state.subjects]);
};
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const StudyContext = createContext();

const initialState = {
  subjects: [],
  tasks: [],
  loading: false,
};

function studyReducer(state, action) {
  switch (action.type) {
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, action.payload] };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
        )
      };
    default:
      return state;
  }
}

export const StudyProvider = ({ children }) => {
  // 1. Initialize state from LocalStorage or use defaults
  const [state, dispatch] = useReducer(studyReducer, initialState, () => {
    const localData = localStorage.getItem('study_companion_data');
    return localData ? JSON.parse(localData) : initialState;
  });

  // 2. Sync State to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('study_companion_data', JSON.stringify(state));
  }, [state]);

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
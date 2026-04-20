import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StudyProvider } from './context/StudyContext';

// Pages
// Correct Imports
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import AITools from "./pages/AITools";
// Note: Create a placeholder for Revision if not built yet
const RevisionPlanner = () => <div className="p-10 text-2xl font-bold">Revision Planner (Coming Soon)</div>;

// Components
import Sidebar from './components/Sidebar'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <StudyProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
          {/* Persistent Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-64 p-4 md:p-8">
            <Routes>
              {/* Default Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/revision" element={<RevisionPlanner />} />
            </Routes>
          </main>

          {/* Global Notification Popups */}
          <ToastContainer position="bottom-right" theme="colored" />
        </div>
      </Router>
    </StudyProvider>
  );
};

export default App;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookMarked, 
  CheckSquare, 
  Sparkles, 
  History,
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookMarked },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'AI Assistant', path: '/ai-tools', icon: Sparkles },
    { name: 'Revision', path: '/revision', icon: History },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 z-40">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-indigo-600 p-2 rounded-xl text-white">
          <GraduationCap size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Study<span className="text-indigo-600">AI</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Profile/Bottom Section (Aesthetic Touch) */}
      <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">User Account</p>
            <p className="text-xs text-gray-500 truncate">Student Mode</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
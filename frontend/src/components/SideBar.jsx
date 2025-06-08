import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Star, Settings, Menu, X } from 'lucide-react';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div
      className={`h-screen transition-all duration-300 flex flex-col
        ${isOpen ? 'w-64' : 'w-16'}
        bg-gradient-to-b from-cyan-600 to-teal-400 text-white shadow-xl relative`}
    >
      
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
      
        <h2
          className={`text-2xl font-bold transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          NoteHub
        </h2>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none ml-auto"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      <nav className="flex flex-col gap-2 p-4 text-base font-medium">
        <SidebarLink to="/dashboard/AllNotes" label="All Notes" icon={<Book size={20} />} isOpen={isOpen} />
        <SidebarLink to="/dashboard/favorites" label="Favorites" icon={<Star size={20} />} isOpen={isOpen} />
        <SidebarLink to="/dashboard/settings" label="Settings" icon={<Settings size={20} />} isOpen={isOpen} />
      </nav>
    </div>
  );
}

const SidebarLink = ({ to, label, icon, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
       ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}
       text-white`
    }
  >
    {icon}
    <span className={`transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
      {label}
    </span>
  </NavLink>
);

export default SideBar;

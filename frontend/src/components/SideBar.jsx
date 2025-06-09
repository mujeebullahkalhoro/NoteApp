import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Star, Settings, Menu, X, Flag } from 'lucide-react';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // sm breakpoint

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldShowLabel = !isMobile || isOpen;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`z-40 fixed sm:static h-screen flex flex-col bg-gradient-to-b from-cyan-600 to-teal-400 text-white shadow-xl
          transition-all duration-300
          ${isMobile ? (isOpen ? 'w-64' : 'w-16') : 'w-64'}
        `}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <h2
            className={`text-2xl font-bold transition-all duration-300
              ${shouldShowLabel ? 'opacity-100' : 'opacity-0 hidden'}
            `}
          >
            NoteHub
          </h2>

          {/* Toggle button only on small screens */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white ml-auto"
              aria-label="Toggle sidebar"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 p-4 text-base font-medium">
          <SidebarLink to="/dashboard/AllNotes" label="All Notes" icon={<Book size={20} />} showLabel={shouldShowLabel} />
          <SidebarLink to="/dashboard/favorites" label="Favorites" icon={<Star size={20} />} showLabel={shouldShowLabel} />
          <SidebarLink to="/dashboard/important" label="Important" icon={<Flag size={20} />} showLabel={shouldShowLabel} />
          <SidebarLink to="/dashboard/settings" label="Settings" icon={<Settings size={20} />} showLabel={shouldShowLabel} />
        </nav>
      </div>
    </>
  );
}

const SidebarLink = ({ to, label, icon, showLabel }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
      ${isActive ? 'bg-white/20 font-semibold border-l-4 border-white' : 'hover:bg-white/10'}
      text-white`
    }
  >
    <span title={label}>{icon}</span>
    <span className={`transition-all duration-200 ${showLabel ? 'block' : 'hidden'}`}>
      {label}
    </span>
  </NavLink>
);

export default SideBar;

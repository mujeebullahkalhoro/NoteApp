import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Star, Settings, Flag } from 'lucide-react';

function SideBar({ isMobile }) {
  // Always show labels on desktop; hide on mobile
  const shouldShowLabel = !isMobile;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-40 flex flex-col
        bg-gradient-to-b from-cyan-600 to-teal-400 text-white shadow-xl
        transition-width duration-300 ease-in-out
        ${isMobile ? 'w-16' : 'w-16 sm:w-20 md:w-64'}
      `}
      aria-label="Sidebar navigation"
    >
      {/* Top Section */}
      <div className="flex items-center justify-center py-4 border-b border-white/20">
        <h2
          className={`text-xl font-bold transition-all duration-300 ${
            shouldShowLabel ? 'block' : 'hidden'
          }`}
        >
          NoteHub
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-4 text-base font-medium">
        <SidebarLink
          to="/dashboard/AllNotes"
          label="All Notes"
          icon={<Book size={20} />}
          showLabel={shouldShowLabel}
        />
        <SidebarLink
          to="/dashboard/favorites"
          label="Favorites"
          icon={<Star size={20} />}
          showLabel={shouldShowLabel}
        />
        <SidebarLink
          to="/dashboard/important"
          label="Important"
          icon={<Flag size={20} />}
          showLabel={shouldShowLabel}
        />
        <SidebarLink
          to="/dashboard/settings"
          label="Settings"
          icon={<Settings size={20} />}
          showLabel={shouldShowLabel}
        />
      </nav>
    </aside>
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
    <span
      className={`transition-all duration-200 ${
        showLabel ? 'block' : 'hidden'
      }`}
    >
      {label}
    </span>
  </NavLink>
);

export default SideBar;

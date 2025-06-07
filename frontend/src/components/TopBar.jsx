import React, { useState } from 'react';
import { LogOut, User, Sun, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const gradientButtonStyle =
  "bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-1 whitespace-nowrap select-none text-sm";

function TopBar({ searchValue, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    console.log('Note saved:', { title, content });
    
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <header className="w-full bg-gray-100 shadow-md px-4 sm:px-6 py-3 h-20">
      <div className="flex items-center justify-between h-full">
        
        <div className="flex-grow">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>

        
        <nav className="hidden sm:flex items-center gap-4 ml-4">
          <button
            onClick={() => setShowModal(true)}
            className={gradientButtonStyle}
          >
            + Add Note
          </button>

          <button
            aria-label="Toggle dark mode"
            className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-2 transition-colors duration-200"
          >
            <Sun size={22} />
          </button>

          <button
            aria-label="User profile"
            className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-2 transition-colors duration-200"
          >
            <User size={22} />
          </button>

          <button
            onClick={() => {
              console.log('Logout clicked');
            }}
            className={gradientButtonStyle}
            aria-label="Logout"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>

        
        <button
          aria-label="Toggle menu"
          className="sm:hidden ml-4 text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-2 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      
      {menuOpen && (
        <nav className="sm:hidden mt-3 flex flex-col gap-3 px-2">
          <button
            onClick={() => setShowModal(true)} 
            className={gradientButtonStyle}
          >
            + Add Note
          </button>

          <button
            aria-label="Toggle dark mode"
            className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-2 transition-colors duration-200 flex items-center gap-2"
          >
            <Sun size={22} />
            Dark Mode
          </button>

          <button
            aria-label="User profile"
            className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-md p-2 transition-colors duration-200 flex items-center gap-2"
          >
            <User size={22} />
            Profile
          </button>

          <button
            onClick={() => {
              console.log('Logout clicked');
            }}
            className={gradientButtonStyle}
            aria-label="Logout"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      )}

    {showModal && (
    <div className="fixed inset-0 z-50   flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-2 transform transition-all duration-300 scale-100 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Note</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows="4"
        className="w-full resize-none  mb-3 px-4 py-2 border border-gray-200  rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </header>
  );
}

export default TopBar;

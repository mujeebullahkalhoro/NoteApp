import React, { useState } from 'react';
import { LogOut, User, Sun, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import NoteModal from './NoteModal';

const gradientButtonStyle =
  "bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-1 whitespace-nowrap select-none text-sm";

function TopBar({ searchValue, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        return;
      }

      const savedNote = await response.json();
      console.log('Note saved:', savedNote);

      setTitle('');
      setContent('');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save note:', err);
    }
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

  
      <NoteModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSave={handleSave}
        handleUpdate={() => {}}   
        editingNote={null}       
        setEditingNote={() => {}} 
      />
    </header>
  );
}

export default TopBar;

// src/components/TopBar.jsx
import React, { useState } from 'react';
import { LogOut, User,  Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import NoteModal from './NoteModal';
import { useNavigate } from 'react-router-dom';

const gradientButtonStyle =
  "bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-1 whitespace-nowrap select-none text-sm";

function TopBar({ searchValue, onSearchChange, addNoteToState }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving note:', errorData.message);
        return;
      }

      const savedNote = await response.json();
      addNoteToState(savedNote); // Immediately update shared state

      // Reset modal state
      setTitle('');
      setContent('');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000//logout', {
        method: 'POST',
        credentials: 'include', // send cookies with request
      });

      if (!response.ok) {
        console.error('Logout failed');
        return;
      }

      // Redirect user to login or landing page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="w-full bg-gray-100 shadow-md px-4 sm:px-6 py-3 h-20">
      <div className="flex items-center justify-between h-full">
        <div className="flex-grow">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>

        <nav className="hidden sm:flex items-center gap-4 ml-4">
          <button onClick={() => setShowModal(true)} className={gradientButtonStyle}>
            + Add Note
          </button>
        
          <button className="text-gray-600 hover:text-teal-500 p-2"><User size={22} /></button>
          <button onClick={handleLogout} className={gradientButtonStyle}>
            <LogOut size={20} /> Logout
          </button>
        </nav>

        <button
          className="sm:hidden ml-4 text-gray-600 hover:text-teal-500 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="sm:hidden mt-3 flex flex-col gap-3 px-2">
          <button onClick={() => setShowModal(true)} className={gradientButtonStyle}>
            + Add Note
          </button>
         
          <button className="text-gray-600 hover:text-teal-500 p-2 flex items-center gap-2">
            <User size={22} /> Profile
          </button>
          <button onClick={handleLogout} className={gradientButtonStyle}>
            <LogOut size={20} /> Logout
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

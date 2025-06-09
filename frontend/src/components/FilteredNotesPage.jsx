import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';

function FilteredNotesPage({ filterKey }) {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/note', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch notes');
          return;
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/note/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Failed to delete note');
        return;
      }

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleFlag = async (note, key) => {
    try {
      const updatedValue = !note[key];
      const response = await fetch(`http://localhost:5000/note/${note._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ [key]: updatedValue }),
      });

      if (!response.ok) return;

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
      );
    } catch (err) {
      console.error(`Error toggling ${key}:`, err);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit note', id);
  };

  const filteredNotes = notes.filter((note) => note[filterKey]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredNotes.length === 0 ? (
        <p></p>
      ) : (
        filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            title={note.title}
            content={note.content}
            favorite={note.favorite}
            important={note.important}
            onDelete={() => handleDelete(note._id)}
            onEdit={() => handleEdit(note._id)}
            onToggleFavorite={() => toggleFlag(note, 'favorite')}
            onToggleImportant={() => toggleFlag(note, 'important')}
          />
        ))
      )}
    </div>
  );
}

export default FilteredNotesPage;

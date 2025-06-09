import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { useOutletContext } from 'react-router-dom';

function NotePage() {
  const { search, notes, setNotes } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
  }, [setNotes]);

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

  const handleEdit = (id) => {
    const note = notes.find((n) => n._id === id);
    if (note) {
      setEditingNote(note);
      setTitle(note.title);
      setContent(note.content);
      setShowModal(true);
    }
  };

  const handleUpdate = async () => {
    if (!editingNote || !title.trim() || !content.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/note/${editingNote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating note:', errorData.message);
        return;
      }

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );

      closeModal();
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  // OPTIONAL: handle new note creation if needed
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

      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      closeModal();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/note/${id}/favorite`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!response.ok) return;

      const updated = await response.json();
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? { ...note, favorite: updated.favorite } : note))
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleToggleImportant = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/note/${id}/important`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!response.ok) return;

      const updated = await response.json();
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? { ...note, important: updated.important } : note))
      );
    } catch (error) {
      console.error('Error toggling important:', error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            title={note.title}
            content={note.content}
            favorite={note.favorite}
            important={note.important}
            onDelete={() => handleDelete(note._id)}
            onEdit={() => handleEdit(note._id)}
            onToggleFavorite={() => handleToggleFavorite(note._id)}
            onToggleImportant={() => handleToggleImportant(note._id)}
          />
        ))}
      </div>

      <NoteModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        handleSave={handleSave}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default NotePage;

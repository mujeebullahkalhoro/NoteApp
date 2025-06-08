import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard'; 

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/note', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) return console.error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    
    console.log("Delete clicked for:", id);
  };

  const handleEdit = (id) => {
    
    console.log("Edit clicked for:", id);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          title={note.title}
          content={note.content}
          onDelete={() => handleDelete(note._id)}
          onEdit={() => handleEdit(note._id)}
        />
      ))}
    </div>
  );
}

export default NotesPage;

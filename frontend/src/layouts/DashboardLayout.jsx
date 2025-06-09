import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:5000/user/auth/', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Failed to verify auth:', error);
        navigate('/login');
      });
  }, [navigate]);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/note', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch notes');
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  // Add new note to state
  const addNoteToState = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <TopBar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          addNoteToState={addNoteToState}
        />
        <main className="p-4 overflow-y-auto">
          <Outlet context={{ search, notes, setNotes }} />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

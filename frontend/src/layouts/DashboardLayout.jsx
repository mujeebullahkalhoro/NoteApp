import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const navigate = useNavigate();

  // Auth check
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

  // Fetch notes
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

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addNoteToState = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="flex h-screen  overflow-hidden">
      
      <SideBar isMobile={isMobile} />

      
      <div
        className={`
          flex flex-col flex-1 w-0 transition-all duration-300
          ${isMobile ? 'ml-16' : 'ml-16 sm:ml-20 md:ml-64'}
        `}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 shadow-md bg-white">
          
          <div className="flex-grow" />

          {/* Search + Add Note */}
          <TopBar
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            addNoteToState={addNoteToState}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Outlet context={{ search, notes, setNotes }} />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

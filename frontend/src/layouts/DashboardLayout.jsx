import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const [search, setSearch] = useState('');
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

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <TopBar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />
        <main className='p-4 overflow-y-auto'>
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

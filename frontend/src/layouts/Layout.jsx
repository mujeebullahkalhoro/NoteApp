import React from 'react'
import Header from '../components/Header'
import bgImage from '../assets/bgnote.png'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='h-screen flex flex-col bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>

        <Header />

        <main>

            <Outlet />

        </main>

    </div>
  )
}

export default Layout
import React from 'react'
import Header from '../components/Header'
import bgImage from '../assets/bgnote.png'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='h-screen w-full flex flex-col gap-2.5 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>

        <Header />



        <main className='flex-1 flex items-center justify-center'>

           <Outlet />


        </main>

       

       
        

    </div>
  )
}

export default Layout
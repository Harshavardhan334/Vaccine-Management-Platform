import React from 'react'
import RoleNavbar from '../components/navs/RoleNavbar.jsx'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../components/Auth.jsx'
const Home = () => {
  const { user } = useAuth()

  if (user?.role === 'admin') {
    return (
      <>
        <RoleNavbar />
        <Navigate to="/admin" replace />
      </>
    )
  }

  return (
    <>
      <RoleNavbar />
      <div className='h-screen bg-black text-white flex flex-col gap-4 justify-center items-center text-3xl'>
        <div>Home</div>
        <div className='text-base'>
          <Link to="/admin/requests" className='underline'>Admin: Manage Requests</Link>
        </div>
      </div>
    </>
  )
}

export default Home
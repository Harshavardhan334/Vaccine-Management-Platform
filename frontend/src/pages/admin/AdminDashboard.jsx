import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/navs/AdminNavbar.jsx'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, vaccines: 0, diseases: 0 })

  useEffect(() => {
    // Placeholder for future stats
  }, [])

  return (
    <>
      <AdminNavbar />
      <div className='min-h-screen bg-black text-white flex justify-center items-center'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-white text-black p-4 rounded'>Users: {stats.users}</div>
          <div className='bg-white text-black p-4 rounded'>Vaccines: {stats.vaccines}</div>
          <div className='bg-white text-black p-4 rounded'>Diseases: {stats.diseases}</div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
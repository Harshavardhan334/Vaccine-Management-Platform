import React from 'react'
import RoleNavbar from '../components/navs/RoleNavbar.jsx';
import { Link } from 'react-router-dom';
const Home = () => {
  return (<>
  <RoleNavbar/>
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
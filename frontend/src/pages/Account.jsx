import React from 'react'
import Navbar from '../components/navs/Navbar.jsx'
import Dashboard from '../components/Dashboards/Dashboard.jsx'
const Account = () => {
  return (<>
   <Navbar/>
    <div className='h-screen bg-black text-white flex justify-center items-center text-3xl'>
      {/* Account */} 
    <Dashboard/>
    </div>
  </>
  )
}

export default Account

import React from 'react'
import Navbar from '../components/navs/Navbar.jsx'
import ResidentDashboard from '../components/Dashboards/ResidentDashboard.jsx'
const Account = () => {
  return (<>
   <Navbar/>
    <div className='h-screen bg-black text-white flex justify-center items-center text-3xl'>
      {/* Account */} 
    <ResidentDashboard/>
    </div>
  </>
  )
}

export default Account

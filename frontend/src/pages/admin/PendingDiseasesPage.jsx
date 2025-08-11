import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../config.js'
import AdminNavbar from '../../components/navs/AdminNavbar.jsx'

const PendingDiseasesPage = () => {
  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/admin/diseases/requests`, { withCredentials: true })
    setRequests(res.data)
  }

  const approve = async (id) => {
    await axios.put(`${BACKEND_URL}/api/admin/diseases/approve/${id}`, {}, { withCredentials: true })
    fetchRequests()
  }

  useEffect(() => { fetchRequests() }, [])

  return (
    <>
      <AdminNavbar />
      <div className='min-h-screen bg-black text-white p-6'>
        <h2 className='text-2xl mb-4'>Pending Disease Requests</h2>
        <div className='grid gap-4'>
          {requests.map(r => (
            <div key={r._id} className='bg-white text-black p-4 rounded'>
              <div className='font-semibold'>{r.name}</div>
              <div className='text-sm'>{r.description}</div>
              <button onClick={()=>approve(r._id)} className='mt-2 bg-black text-white px-3 py-1 rounded'>Approve</button>
            </div>
          ))}
          {requests.length === 0 && <div>No pending requests</div>}
        </div>
      </div>
    </>
  )
}

export default PendingDiseasesPage
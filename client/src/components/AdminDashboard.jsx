import React from 'react'
import SideMenu from './SideMenu'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='h-full flex'>
      <SideMenu />
      <div className='w-full m-2 p-5 border border-gray-300 rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
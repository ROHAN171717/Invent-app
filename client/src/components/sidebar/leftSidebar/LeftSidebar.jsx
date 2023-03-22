import React from 'react'
// import { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
// import { RiProductHuntLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const LeftSidebar = ({ children }) => {

  return (
    <div className='flex'>
      <div className='w-1/6 border-4 border-red-500'>

      <div className='bg-blue-900 p-4 flex justify-between'>
        <Link to='/'>
          <h1 className='text-2xl font-bold text-white'>R-Invent</h1>
        </Link>
        <HiMenuAlt3 className='mt-2 text-2xl text-white'/>
      </div>

      <div className='text-2xl'>

        <div className='border-b-2 border-gray-400'>
          <Link to='/dashboard'>
            <div className='flex pl-4'>
              <HiMenuAlt3 className='mt-3 text-2xl'/>
              <h1 className='p-2 pl-3'>Dashboard</h1>
            </div>
          </Link>
        </div>
        
        <div className='border-b-2 border-gray-400'>
          <Link to='/profile'>
            <div className='flex pl-4'>
              <HiMenuAlt3 className='mt-3 text-2xl'/>
              <h1 className='p-2 pl-3'>Profile</h1>
            </div>
          </Link>
        </div>

        <div className='border-b-2 border-gray-400'>
          <Link to='/edit-profile'>
            <div className='flex pl-4'>
              <HiMenuAlt3 className='mt-3 text-2xl'/>
              <h1 className='p-2 pl-3'>Edit Profile</h1>
            </div>
          </Link>
        </div>

        <div className='border-b-2 border-gray-400'>
          <Link to='/add-product'>
            <div className='flex pl-4'>
              <HiMenuAlt3 className='mt-3 text-2xl'/>
              <h1 className='p-2 pl-3'>Add Product</h1>
            </div>
          </Link>
        </div>

        <div className='border-b-2 border-gray-400'>
          <Link to='/contact-us'>
            <div className='flex pl-4'>
              <HiMenuAlt3 className='mt-3 text-2xl'/>
              <h1 className='p-2 pl-3'>Report Bug</h1>
            </div>
          </Link>
        </div>

      </div>
      </div>
      <main className='w-full border-4 border-green-400 px-6'>
        {children}
      </main>
    </div>
  )
}

export default LeftSidebar

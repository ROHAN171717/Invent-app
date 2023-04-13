import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const Layout = ({ children }) => {
  return (
    <div className='bg-slate-600 h-screen'>
      <div className='bg-slate-600'>
      <Header/>
      <div>{children}</div>
      {/* {children} */}
      <Footer/>
      </div>
    </div>
  )
}

export default Layout;

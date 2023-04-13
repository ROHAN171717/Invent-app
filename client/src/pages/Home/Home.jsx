import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import heroImg from "../../assets/inv-img.png";
import "./Home.css";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';



const Home = () => {
    const login = localStorage.getItem("name");

  return (
    <div className='bg-slate-700 h-screen'>
        <div className="body px-4 sm:px-14 bg-slate-700">
        <div className="navbar pt-5">
            <div className="flex-1">
                {/* <a className="btn btn-md normal-case text-xl hover:bg-slate-900 hover:text-zinc-100
                        bg-slate-200 text-black" href="/">R-Invent</a> */}
            </div>
            <div>
                <ul className="menu menu-horizontal px-1">
                    
                    {login ? (
                        <button className='btn btn-sm text-xl mr-2 pt-1 hover:bg-slate-900 hover:text-zinc-100
                        bg-slate-200 text-black'>
                            <Link to="/dashboard">DashBoard</Link>
                        </button>
                    ):(
                        <>
                            <button className='btn btn-sm text-xl mr-2 pt-1 hover:bg-slate-900 hover:text-zinc-100
                        bg-slate-200 text-black'>
                                <Link to="/register">Register</Link>
                            </button>
                            <button className='btn btn-sm text-xl pt-1 hover:bg-slate-900 hover:text-zinc-100
                        bg-slate-200 text-black'>
                                <Link to="/login">Login</Link>
                            </button>
                        </>
                    )}
                </ul>
            </div>
            </div>
            {/* <img src={inventImg} className="bg contrast-200"/> */}
            {/* HERO SECTION */}
            <section className='md:flex md:justify-between md:flex-row-reverse pt-20'>
            <div>
                    <img src={heroImg} alt="Inventory" className='hidden md:block'/>
                </div>
                <div className='inline-block rounded-lg'>
                    <h1 className='font-bold sm:text-7xl text-6xl text-orange-500'>Inventory & Stock <br/> Management <br/> Solution</h1>
                    <br/>
                    <p className='text-lg text-sky-100'>
                    Inventory system to control and manage proucts in the <br/> warehouse in
                    real timeand integrated to make it easier to <br/> develop your business.
                   
                    </p>
                    <button className="btn  hover:bg-slate-900 hover:text-zinc-100
                        bg-slate-200 text-black btn-sm mt-4 pt-[1.5px] text-md">
                        <Link to="/dashboard">Free Trial 1 Month</Link>
                    </button>
                    <div className='flex mt-2 text-white'>
                        <ul className='list-style-type:none p-4 '>
                            <h3 className='font-bold text-xl'>14k</h3>
                            <p>Brand Owners</p>
                        </ul>
                        <ul className='list-style-type:none p-4'>
                            <h3 className='font-bold text-xl'>23k</h3>
                            <p>Active Users</p>
                        </ul>
                        <ul className='list-style-type:none p-4'>
                            <h3 className='font-bold text-xl'>500+</h3>
                            <p>Partners</p>
                        </ul>
                    </div>
                </div>
                
            </section>
    </div>
    </div>
  )
}

export default Home

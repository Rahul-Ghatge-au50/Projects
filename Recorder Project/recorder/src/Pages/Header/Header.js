import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <>
        <div className='header-cont'>
            <div className='main-cont'>   
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/login' className='nav-link'>Login</Link>
            </div>
        </div>

        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default Header

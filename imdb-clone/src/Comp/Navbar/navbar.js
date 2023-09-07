import React from 'react';
import './navbar.css';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <div className="nav-cont">
                <div className="container">
                    <div className="left-div">
                        <Link to='/'><img className='nav-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' alt='' /></Link>
                        <Link to='/movies/popular' className='link' >Popular</Link>
                        <Link to='/movies/top_rated' className='link' >Top-Rated</Link>
                        <Link to='/movies/upcoming' className='link' >Upcoming</Link>
                    </div>
                    <div className="right-div">
                        <button className='btn-lg'>LOGIN</button>
                        <button className='btn-reg'>REGISTER</button>
                    </div>
                </div>
            </div>

            <main>
                <Outlet />
            </main>
        </>

    )
}

export default Navbar

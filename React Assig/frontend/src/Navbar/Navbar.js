import React from 'react'
import './navbar.css';
import { useContext } from "react";
import { Context } from "../Context/Context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';

function Navbar() {

    const { dispatch, user } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('cart');
    }
    return (
        <>
            <div className="nav-cont">
                <div className="profile-cont">
                    {
                        user?.image ? <img src={user?.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '50px', border: '2px solid blue' }} />
                            : <AccountCircleIcon style={{ fontSize: '60px', color: ' rgb(0, 110, 255)' }} />
                    }
                    {
                        user.firstName ? <h3>{user.firstName}</h3> : <h3>Username</h3>
                    }

                </div>
                <h2>Welcome to E-commorce Website</h2>
                <div className="nav-logout-btn">
                    <button onClick={handleLogout} className='logout-btn' >
                        Log Out
                    </button>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Navbar

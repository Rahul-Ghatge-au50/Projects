import React, { useEffect, useState } from 'react'
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get('http://localhost:5000/api/category/');
            setCats(res.data);
        }
        getCat();
    }, [])

    return (
        <>
            <div className='sidebar'>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>ABOUT ME</span>
                    <img src="https://twokidsandacoupon.com/wp-content/uploads/2021/01/How-to-Get-the-Best-Food-Deals-and-Find-Free-Food-Near-Me.jpg"
                        alt=""
                        className='sidebarImg' />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Vero corrupti est voluptates, sunt aliquid porro sapiente autem nemo doloremque.
                    </p>
                </div>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>CATEGORIES</span>
                    <ul className='sidebarList'>
                        {
                            cats.map((item) => (
                                <Link to={`/?cat=${item.name}`} style={{textDecoration:'none',color:'inherit'}}>
                                    <li className='sidebarListItem'>{item.name}</li>
                                </Link>
                            ))
                        }

                        <li className='sidebarListItem'>Life</li>
                        <li className='sidebarListItem'>Game</li>
                    </ul>
                </div>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>FOLLOW US</span>
                    <div className="sidebarSocial">
                        <i className="sidebarIcon fa-brands fa-square-facebook" />
                        <i className="sidebarIcon fa-brands fa-square-instagram" />
                        <i className="sidebarIcon fa-brands fa-square-twitter" />
                        <i className="sidebarIcon fa-brands fa-pinterest" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Sidebar

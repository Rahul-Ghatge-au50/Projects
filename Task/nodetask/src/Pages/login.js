import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email:email,
            password:password
        }

        const res = await  axios.post(`http://localhost:5001/login`,(user));
        console.log(res);
        if(res){
            navigate('/');
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div className='task-div' >
            <form onSubmit={handleSubmit} className='login-cont'>
                <input
                    type="email"
                    placeholder='@gmail'
                    className='log-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    className='log-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    error ? (<p style={{ color: 'red' }} >Wrong Credentials</p>) :
                        (<div className="login-btn">
                            <button type='submit' >Login</button>
                        </div>)
                }

                <button className="">
                    <Link to={'/signup'} style={{ textDecoration: 'none', color: 'white' }}>
                        Register
                    </Link>
                </button>
            </form>
        </div>
    )
}

export default Login

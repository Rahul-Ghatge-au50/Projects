import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import axios from 'axios';


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        const user = {
            email:email,
            password:password,
            username:username
        }

        const res = await axios.post(`http://localhost:5001/register`,(user))
        console.log(res);
        if(res){
            navigate('/Login')
        }
    }

    return (
        <>
        <div className='task-div'>
            <form onSubmit={handleSubmit} className='login-cont'>
                <input
                    type="text"
                    placeholder='username'
                    className='log-input'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder='@gmail'
                    className='log-input'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    className='log-input'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="login-btn">
                    <button type='submit' >Sign Up</button>
                </div>
                <Link to={'/login'}>
                    <button className='signup-login-btn'>LOG IN</button>
                </Link>
            </form>
        </div>
        </>
    )
}

export default Register

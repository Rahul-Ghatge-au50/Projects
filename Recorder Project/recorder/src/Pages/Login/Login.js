import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submit = async (e) => {
        e.preventDefault();
        
        try{
            await axios.post('http://localhost:3001/login',{
                email,password
            })
            .then(res => {
                if(res.data = 'saved'){
                    navigate('/')
                } else if(res.data = 'login'){
                    navigate('/login')
                } else if(res.data = 'Password is Incorrect'){
                    console.log('Password is Incorrect')
                }
            })
        }catch(err){
            console.log(err)
        }
        setEmail('');
        setPassword('');
        
    }


    return (
        <>
            <div className='container'>
                <div className="form-cont">
                    <h1>Login</h1>
                    <p>Please enter your login and password</p>
                    <form onSubmit={submit} className='form'>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        <button type='submit' className='login-btn'>Login</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login;
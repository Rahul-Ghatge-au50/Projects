import React, { useContext, useRef, useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import axios from 'axios';

function Login() {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);
  const [error,setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      // res.data && window.location.replace("/");

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
      setError(true)
    }
  }

  return (
    <>
      <div className="login">
        <span className="loginTitle">
          Login
        </span>
        <form onSubmit={handleSubmit} className="loginForm">
          <label>Username</label>
          <input type="text" placeholder='Enter username' className='loginInput' ref={usernameRef} />
          <label>Password</label>
          <input type="password" placeholder='Enter password' className='loginInput' ref={passwordRef} />
          <button type='submit' className='loginBtn' >Login</button>
          {
            error &&   <h2 style={{color:'red',marginTop:'10px'}}>Wrong Credeintials</h2>
          }
        </form>
        <button className='loginRegisterBtn'>
          <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>
            Register
          </Link>
        </button>
      </div>
    </>
  )
}

export default Login

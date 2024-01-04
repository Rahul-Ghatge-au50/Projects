import React, { useContext, useState } from 'react'
import './login.css';
import LoginImg from '../Image/ReactTask.png';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState({});
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // fetch('https://dummyjson.com/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({

      //     username: username,
      //     password: password,
      //     // expiresInMins: 60, // optional
      //   })
      // })
      //   .then(res => res.json())
      //   .then(data => setUser(data));
      const user ={
        username:username,
        password:password
      }
      const res = await axios.post('https://dummyjson.com/auth/login',user);
      //console.log(res)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
      navigate('/');
    } catch {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }

  return (
    <>
      <div className='container' >
        <div className="login-cont">
          <div className='img-cont' >
            <img src={LoginImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="form-cont">
            <h1>Login In</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <div className="login-btn">
                <button type="submit" className="btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

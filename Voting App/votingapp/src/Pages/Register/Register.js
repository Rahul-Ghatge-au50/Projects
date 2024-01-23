import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './register.css';
import axios from 'axios';


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(email + password + username + number);
        // setEmail('');
        // setPassword('');
        const user = {
            email:email,
            password:password,
            username:username,
            PhoneNo:number
        }
        const res = await axios.post('http://localhost:5000/register',(user));
        //console.log(res);
        navigate('/')
    }

    return (
        <>
            <div className="Register">
                <div className="reister-cont">
                    <form onSubmit={handleSubmit} className="register-form">
                        <input type="text" placeholder="username" className="register-input" onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="password" className="register-input" onChange={(e) => setPassword(e.target.value)} />
                        <input type="email" placeholder="@email" className="register-input" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Phone No" className="register-input" onChange={(e) => setNumber(e.target.value)} />
                        <div className="register-btn">
                            <button type="submit" className="btn">Register</button>
                            <Link to='/' >
                                <button className="btn">Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Register;
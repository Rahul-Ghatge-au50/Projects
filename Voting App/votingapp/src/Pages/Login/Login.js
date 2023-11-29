import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { useState } from "react";
import axios from "axios";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
            const user = {
                email: email,
                password: password
            }

            const res = await axios.post('http://localhost:5000/login', (user));
            console.log(res);


            if (res.data === 'Wrong Creditianls!') {
                setError(true);
            }else{
                navigate('/voting');
            }

            if (email === 'rahulghatge166@gmail.com' && password === 'Rahul') {
                navigate('/home')
            }
    }



    return (
        <>
            {error && <h3 style={{ color: 'red' ,}}>Wrong Creditianls</h3>}

            <div className="login">
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" placeholder="@email" className="login-input" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" className="login-input" onChange={(e) => setPassword(e.target.value)} />

                    <div className="login-btn">
                        <button type="submit" className="btn">Login</button>

                        <Link to='/register' >
                            <button className="btn">Register</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
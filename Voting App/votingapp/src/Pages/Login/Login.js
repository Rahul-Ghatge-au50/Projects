import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../Context/context";



function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);
    const [voted,setVoted] = useState(false);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const user = {
                email: email,
                password: password
            }

            const data = await axios.get(`http://localhost:5000/votedUser?email=${email}`);
            //console.log(data.data.Boolean);
            if (!data.data.Boolean) {
                const res = await axios.post('http://localhost:5000/login', (user));
                //console.log(res);
                //console.log(user);
                if (res.data === 'Wrong Creditianls!') {
                    setError(true);
                    setEmail('');
                    setPassword('');
                } else {
                    navigate('/voting');
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
                }
            }else {
                dispatch({tyep:"LOGIN_FAILURE"});
                    setVoted(true);
                    navigate('/');
                    setEmail('');
                    setPassword('');
            }
            if (email === 'rahulghatge166@gmail.com' && password === 'Rahul') {
                navigate('/home')
            }
        } catch (error) {
            dispatch({ tyep: 'LOGIN_FAILURE' })
        }
    }


    return (
        <>
            {error && <h3 className="error">Wrong Creditianls</h3>}
            {voted && <h3 className="error">You have voted you cant vote again</h3>}

            <div className="login">
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" placeholder="@email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />

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
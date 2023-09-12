import { useContext, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import './setting.css';
// import Img from '../../Images/settingImg.jpeg';
import { Context } from '../../Context/Context';
import axios from 'axios';



export default function Setting() {
    const { user,dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success,setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updateUser = {
            userid: user._id,
            username, email, password
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updateUser.profileImg = fileName;
            try {
                await axios.post('http://localhost:5000/api/upload/', data)
            } catch (err) { }
        }
        try {
            const res = await axios.put(`http://localhost:5000/api/user/${user._id}`, updateUser );
            dispatch({type:"UPDATE_SUCCESS",payload:res.data});
            setSuccess(true);
        } catch (err) { 
            dispatch({type:"UPDATE_FAILURE"});
        }
    }

    const PF = 'http://localhost:5000/images/'

    return (
        <>
            <div className="setting">
                <div className="settingWrapper">
                    <div className="settingTitle">
                        <span className="settingTitleUpdate">Update your Account</span>
                        <span className="settingTitleDelete">Delete Account</span>
                    </div>
                    <form onSubmit={handleSubmit} className="settingForm">
                        <label>Profile Picture</label>
                        <div className="settingPP">
                            <img src={file ? (URL.createObjectURL(file)) : (PF + user.profileImg)} alt="" />
                            <label htmlFor="fileInput">
                                <i className="settingPPIcon far fa-user-circle"></i>
                            </label>
                            <input
                                type="file"
                                id='fileInput'
                                style={{ display: 'none' }}
                                className='settingPPInput'
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </div>
                        <label>Username</label>
                        <input
                            type='text'
                            placeholder={user.username}
                            name='name'
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder={user.email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='*****'
                            name='password' 
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <button className='settingButton' type='submit'>
                            Update
                        </button>
                        {   success && 
                            <h5 style={{color:'Blue',textAlign:'center',marginTop:'20px'}}>Profile is Updated...</h5>
                        }
                    </form>
                </div>
                <Sidebar />
            </div>
        </>
    )
}


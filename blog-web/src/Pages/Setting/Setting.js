import Sidebar from '../../Component/Sidebar/Sidebar';
import './setting.css';
import Img from '../../Images/settingImg.jpeg';



export default function Setting() {
    return (
        <>
            <div className="setting">
                <div className="settingWrapper">
                    <div className="settingTitle">
                        <span className="settingTitleUpdate">Update your Account</span>
                        <span className="settingTitleDelete">Delete Account</span>
                    </div>
                    <form action="" className="settingForm">
                        <label>Profile Picture</label>
                        <div className="settingPP">
                            <img src={Img} alt="" />
                            <label htmlFor="fileInput">
                                <i className="settingPPIcon far fa-user-circle"></i>
                            </label>
                            <input
                                type="file"
                                id='fileInput'
                                style={{ display: 'none' }}
                                className='settingPPInput' />
                        </div>
                        <label>Username</label>
                        <input type='text' placeholder='username' name='name' />
                        <label>Email</label>
                        <input type='email' placeholder='email' name='email' />
                        <label>Password</label>
                        <input type='password' placeholder='password' name='password' />
                        <button className='settingButton' type='submit'>
                            Update
                        </button>
                    </form>
                </div>
                <Sidebar />
            </div>
        </>
    )
}


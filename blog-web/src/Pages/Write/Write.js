import { useContext, useState } from 'react';
import './write.css';
import { Context } from '../../Context/Context';
import axios from 'axios';

function Write() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            //Line no 22 means so tht the user cant upload same image with diff name and vice versa
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/api/upload/', data)
            } catch (error) {
                throw error
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/posts/', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch (err) { }

    }

    return (
        <>
            <div className="write">
                {file &&
                    <img src={URL.createObjectURL(file)}
                        alt="" className='writeImg' />
                }
                <form onSubmit={handleSubmit} className='writeForm'>
                    <div className="writeFormGrp">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-solid fa-plus"></i>
                        </label>
                        <input id='fileInput' type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])}/>
                        <input type="text" className='writeInput' placeholder='Title' autoFocus={true} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="writeFormGrp">
                        <textarea type='text'
                            placeholder='Tell your story...'
                            className='writeInput writeText'
                            autoFocus={true} 
                            onChange={e => setDesc(e.target.value)}
                            />
                    </div>
                    <button className='writeSubmit' type='submit'>
                        Publish
                    </button>
                </form>
            </div>
        </>
    )
}

export default Write;
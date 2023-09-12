import React, { useContext, useEffect, useState } from 'react';
import './singlepost.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/Context';

function SinglePost() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const PF = 'http://localhost:5000/images/'
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [id])


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
            window.location.replace('/')
        } catch (err) {}
    }

    const handleUpdate = async ( ) => {
        try{
            axios.put(`http://localhost:5000/api/posts/${post._id}`,
            {username: user.username,title,desc});
            setUpdateMode(false);
        }catch(err){}
    }

    return (
        <>
            {user ? (
                <div className='singlePost'>
                    <div className="singlePostWrapper">
                        {post.photo &&
                            <img src={PF + post.photo} alt="" className='singlePostImg' />
                        }
                        {updateMode ? (
                            <input
                                type='text'
                                value={title}
                                className='singlePostTitleInput'
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        ) : (
                            <h1 className='singlePostTitle'>
                                {title}
                                {
                                    post.username === user.username &&
                                    (<div className="singlePostEdit">
                                        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                        <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                    </div>)
                                }
                            </h1>
                        )
                        }
                        <div className="singlePostInfo">
                            <Link to={`/?user=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span>Author: <b className='singlePostAuthor'>{post.username}</b></span>
                            </Link>
                            <span>{new Date(post.createdAt).toDateString()}</span>
                        </div>
                        {
                            updateMode ? (
                                <textarea 
                                className='singlePostDescInput' 
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                            ) : (

                                <p className='singlePostDesc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                </p>
                            )
                        }
                        {
                            updateMode && (
                                <button className='singlePostBtn' onClick={handleUpdate}>
                                    Update
                                </button> 
                            )
                        }
                    </div>
                </div>)
                : (<h1 style={{ color: 'red', fontSize: '30px', flex: '9', textAlign: 'center' }}>
                    User is not Logged
                </h1>)
            }
        </>
    )
}

export default SinglePost

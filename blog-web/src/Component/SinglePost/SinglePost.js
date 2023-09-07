import React, { useEffect, useState } from 'react';
import './singlepost.css';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios';

function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post,setPost] = useState({});
    const PF = 'http://localhost:5000/Images'

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${path}`)
            setPost(res.data)
        }
        getPost();
    },[path])

    return (
        <>
            <div className='singlePost'>
                <div className="singlePostWrapper">
                    {post.photo &&
                        <img src={PF + post.photo} alt="" className='singlePostImg'/>
                    }
                   
                    <h1 className='singlePostTitle'>
                        {post.title}
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                            <i className="singlePostIcon fa-solid fa-trash-can"></i>
                        </div>
                    </h1>
                    <div className="singlePostInfo">
                    <Link to={`/?user=${post.username}`} style={{textDecoration:'none',color:'inherit'}}>
                        <span>Author: <b className='singlePostAuthor'>{post.username}</b></span>
                    </Link>
                        
                        <span>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    <p className='singlePostDesc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Vitae pariatur tempore facere assumenda maxime iusto qui rerum asperiores officia animi?
                    Aliquam quam cum voluptates ipsam corporis magni blanditiis impedit minus?</p>
                </div>
            </div>
        </>
    )
}

export default SinglePost

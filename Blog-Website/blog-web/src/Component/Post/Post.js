import React from 'react'
import './post.css';
import { Link } from 'react-router-dom';

function Post({post}) {

  const PF = 'http://localhost:5000/images/';

  return (
    <>
        <div className='post'>
          {post.photo && <img src={PF + post.photo} 
                 alt="" 
                 className='postImg' />}
            
            <div className="postInfo">
                <div className="postCats">
                {post.categories.map((c) => {
                  return <span className="postCat">{c.name}</span>
                })}  
                </div>
                <Link to={`/post/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                  <span className="postTitle">{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
              <p className='postDesc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nesciunt aliquid neque, quia laborum voluptatibus expedita natus iure 
            voluptatum fugiat mollitia sit suscipit enim minus iusto voluptas!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nesciunt aliquid neque, quia laborum voluptatibus expedita natus iure 
            voluptatum fugiat mollitia sit suscipit enim minus iusto voluptas!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nesciunt aliquid neque, quia laborum voluptatibus expedita natus iure 
            voluptatum fugiat mollitia sit suscipit enim minus iusto voluptas!</p>
        </div>
    </>
  )
}

export default Post

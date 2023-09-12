import React, { useEffect, useState } from 'react'
import './home.css';
import Header from '../../Component/Header/Header';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Posts from '../../Component/Posts/Posts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
  const [post, setPost] = useState([]);
  //const location = useLocation();
  const { search } = useLocation();
  //console.log(location);


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/${search}`);
      //console.log(res.data)
      setPost(res.data)
    }
    fetch();
  }, [search]);


  return (
    <>
      <Header />
      <div className='home'>
        <Posts post={post}/>
        <Sidebar />
      </div>
    </>
  )
}

export default Home

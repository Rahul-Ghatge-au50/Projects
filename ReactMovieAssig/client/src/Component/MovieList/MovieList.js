import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './movieList.css';
import axios from 'axios';


function MovieList() {

    const [moviesList,setMoviesList] = useState([]);
 
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all');
            //console.log(res.data);
            setMoviesList(res.data);
        }
        getData();
    })

  return (
    <>
        <div className="movie-cont">
            <div className="movie-list">
                <h1 className="list-title">Movies</h1>
                <div className="cards-list">
                {
                    moviesList.map((item,id) => {
                         return  <Card item={item} key={id}/>
                    })
                }
                </div>
            </div>
        </div>
    </>
  )
}

export default MovieList

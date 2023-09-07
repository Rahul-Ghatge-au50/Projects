import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/card";
import axios from "axios";
import './movieList.css';

function MovieList() {
    const [moviesList,setMoviesList] = useState([])
    const {type} = useParams();

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        getData()
    },[type])

    const getData = async () => {
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
        //console.log(res);
        setMoviesList(res.data.results);
        //console.log(moviesList)
    }

  return (
    <>
        <div className="movie-cont">
            <div className="movie-list">
                <h1 className="list-title">{(type ? type : "POPULAR").toUpperCase()}</h1>
                <div className="cards-list">
                    {
                        moviesList.map((value,index) => {
                           return <Card movie={value} key={index}/>
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default MovieList;

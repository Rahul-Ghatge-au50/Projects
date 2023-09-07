import React, { useEffect, useState } from 'react'
import './home.css';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../Comp/MovieList/movieList';



function Home() {

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
      //console.log(res)
      setPopularMovies(res.data.results);
      //console.log(popularMovies)

    }
    getData()
  }, [])

  return (
    <>
      <div className="carousel-cont">
        <div className="carousel">
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {
              popularMovies.map((movie,index) => {
                return <Link style={{ textDecoration: 'None', color: 'White' }} key={index} to='/movie/:id'>
                  <div className="posterImage">
                    <img src={`http://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt='' />
                  </div>
                  <div className="posterImg-Overlay">
                    <div className="posterImg-title">{movie ? movie.original_title : ""}</div>
                    <div className="posterImg-runtime">
                      {movie ? movie.release_date : ""}
                      <span className='posterImg-rating'>
                        {movie ? movie.vote_average : ""}
                        <i className='fa-solid fa-star' />{" "}
                      </span>
                    </div>
                    <div className="posterImg-Desc">{movie ? movie.overview : ""}</div>
                  </div>
                </Link>
              })

            }
          </Carousel>
        </div>
      </div>
      <>
        <MovieList/>
      </>
            
    </>
  )
}

export default Home

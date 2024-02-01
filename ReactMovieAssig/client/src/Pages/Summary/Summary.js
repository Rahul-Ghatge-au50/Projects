import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import './summry.css';
import axios from 'axios';

function Summary() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setData(res.data);
    }
    getData();


    //loppping to get single movie show
    for (let i = 0; i < data.length; i++) {
      if (data[i].show.id + "" === id) {
        setMovieData(data[i]);
      }
    }
  }, [movieData, data, id])

  return (
    <>
      {
        movieData.show ?
          <div className="summary-cont">
            <div className="movie-img">
              <img src={movieData.show.image?.original} alt="" />
            </div>
            <div className="movie-details">
              <div className="movie-detail-img">
                <img src={movieData.show.image?.medium} alt="" />
              </div>
              <div className="movie-detail-right">
                <div className="movie-detailright-top">
                  <h3 className="movie-name" >{movieData.show.name ? movieData.show.name : ""}</h3>
                  <p>Languages : {movieData.show.language ? movieData.show.language : ""}</p>
                  <p>{movieData.show.rating.average}</p>
                  <p>{movieData.show.runtime + "min"}</p>
                  <div className="movie-dates">
                    <p>Premium Date : {movieData.show.premiered}</p>
                    <p>Ended Date : {movieData.show.ended}</p>
                  </div>
                  <div className="movie-genres">
                    {
                      movieData.show.genres ? movieData.show.genres.map((genre, id) => {
                        return <><span className="movie-genre" key={id}>{genre}</span></>
                      }) : " "
                    }
                  </div>
                </div>
                <div className="movie-detailRightBottom">
                  <div className="summaryText">Summary</div>
                  <div><b>{movieData.show.name}</b> {movieData.show.summary.slice(19)}</div>
                </div>
                <Link to={`/booking/${movieData.show.id}`} >
                  <div className="booking-btn">
                    <button className='btn' >Book Tickets</button>
                  </div>
                </Link>
              </div>
            </div>
          </div> : ""
      }

    </>
  )
}

export default Summary

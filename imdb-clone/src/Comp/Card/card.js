import React, { useEffect, useState } from "react";
import './card.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom';


function Card(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <>
      {
        loading ?
          (
            <div className="cards">
              <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
              </SkeletonTheme>
            </div>
          )
          :
          (
            <Link style={{ textDecoration: 'None', color: 'White' }} to={`/movie/${props.movie.id}`}>
              <div className="cards">
                <img className="cards-img" src={`http://image.tmdb.org/t/p/original${props.movie.poster_path}`} alt="" />
                <div className="cards-overlay">
                  <div className="card-title">{props.movie.original_title}</div>
                  <div className="card-runtime">
                    {props.movie.release_date}
                    <span className="card-rating">
                      {props.movie.vote_average}
                      <i className='fa-solid fa-star' /></span>
                  </div>
                  <div className="card-desc">{props.movie.overview.slice(0, 100) + "..."}</div>
                </div>
              </div>
            </Link>
          )
      }
    </>
  )
}

export default Card

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './movie.css';



function Movie() {
    const [movieDetail, setMovieDetail] = useState();

    const { id } = useParams();

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [])

    const getData = async () => {
        let res = await axios.get(` https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        console.log(res.data)
        setMovieDetail(res.data)
    }

    return (
        <>
            <div className="movie">
                <div className="movie-intro">
                    <img className="movie-backdrop" alt="" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.backdrop_path : ""}`} />
                </div>
                <div className="movie-detail">
                    <div className="movie-detailLeft">
                        <div className="movie-posterBox">
                            <img className="movie-poster" alt="" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.poster_path : ""}`} />
                        </div>
                    </div>
                    <div className="movie-detailRight">
                        <div className="movie-detailRightTop">
                            <div className="movie-name">{movieDetail ? movieDetail.original_title : ""}</div>
                            <div className="movie-tagline">{movieDetail ? movieDetail.tagline : ""}</div>
                            <div className="movie-rating">
                                {movieDetail ? movieDetail.vote_average : ""}
                                <i className="fa-solid fa-star" />
                                <span className="movie-voteCount" >
                                    {movieDetail ? "(" + movieDetail.vote_count + ")votes" : ""}
                                </span>
                            </div>
                            <div className="movie-runtime">{movieDetail ? movieDetail.runtime + "mins" : ""}</div>
                            <div className="movie-releaseDate">{movieDetail ? "Release Date" + movieDetail.release_date : ""}</div>
                            <div className="movie-genres">
                                {
                                    movieDetail && movieDetail.genres ?
                                        (
                                            movieDetail.genres.map((genre) => {
                                                return <><span className="movie-genre" id={genre.id}>{genre.name}</span></>
                                            })
                                        ) : ""
                                }
                            </div>
                        </div>
                        <div className="movie-detailRightBottom">
                            <div className="synopsisText">Synopsis</div>
                            <div>{movieDetail ? movieDetail.overview : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="movie-links">
                    {
                        movieDetail && movieDetail.imdb_id &&
                        <a href={"https://www.imdb.com/title/" + movieDetail.imdb_id} rel="noreferrer" target="_blank" style={{ textDecoration: "none" }}>
                            <span className="movie-imdbButton">IMDb<i className="newTab fas fa-external-link-alt"></i></span>
                        </a>
                    }
                </div>
            </div>
        </>
    )
}

export default Movie


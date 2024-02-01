import React from 'react';
import './card.css'
import { Link } from 'react-router-dom';

function Card({ item }) {

    return (
        <>
            <Link to={`/summary/${item.show.id}`} >
                <div className="cards">
                    <img className="cards-img" src={item.show.image?.medium} alt="" />
                    <div className="cards-overlay">
                        <div className="card-title">{item.show.name}</div>
                        <div className="card-runtime">
                            {item.show.premiered}
                            <span className="card-rating">
                                {item.show.rating?.average}
                                <i className='fa-solid fa-star' /></span>
                        </div>
                        <div className="card-desc">{item.show.summary?.slice(0, 100) + "..."}</div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card

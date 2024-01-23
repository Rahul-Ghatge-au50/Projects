import React from 'react';
import StarRating from './StarRating';

function Reveiw({ item }) {
    return (
        <>
            <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: '18rem' }}>
                <div className="card-header d-flex justify-content-between">
                    <span>{item.name}</span>
                    <span><StarRating rating={item.rating} /></span>
                </div>
                <div className="card-body">
                    <p className="card-text">{item.reveiw}</p>
                </div>
            </div>
        </>
    )
}

export default Reveiw

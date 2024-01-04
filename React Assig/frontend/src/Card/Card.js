import { useState } from 'react';
import './card.css';

function Card({ item,handleCartCount }) {
    //console.log(item);
    //console.log(item.images);
    const Images = item.images;
    const [quantity, setQuantity] = useState(1);


    return (
        <>
            <div className="card-cont">
                <img src={Images[0]} alt="" className='card-pro-img' />
                <div className="card-info">
                    <div className='card-brand' >
                        <h3>{item.title}</h3>
                        <h4>{item.brand}</h4>
                    </div>
                    <p style={{ textTransform: 'capitalize' }} >{item.category}</p>
                    {/* <p >{item.description}</p> */}
                </div>
                <div style={{ border: '0.8px solid lightGray' }}>
                </div>
                <div className='card-prices' >
                    <div className='price-cont'>
                        {/* <h4>{Math.round(item.price - (item.price * item.discountPercentage / 100))}Rs</h4> */}
                        <h4>{item.price}Rs</h4>
                        <p>Discount: {item.discountPercentage}%</p>
                    </div>
                    <p>Rating: {item.rating}</p>
                </div>
                <div className='card-cart' >
                    <button className='card-btn' onClick={() => handleCartCount(item.id,quantity)} >Add to Cart</button>
                    <div style={{ padding: '0px 20px' }} >
                        <button style={{cursor:'pointer'}} onClick={() => setQuantity(quantity+1)} >+</button>
                            <span style={{margin:'5px'}} >{quantity}</span>
                        <button style={{cursor:'pointer'}} onClick={() => setQuantity(quantity-1)}>-</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card

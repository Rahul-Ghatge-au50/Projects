import React, { useEffect, useState } from 'react'
import './cart.css';


function Cart() {

    const [data, setData] = useState([]);
    const Obj = JSON.parse(localStorage.getItem('cart'));
    // console.log(Obj)
    // console.log(data);
    useEffect(() => {
        setData(Obj.products)
    },[Obj.products]);

    return (
        <>
            <div className='cart-cont' >
                <div className='cart-heading' >
                    <h2>Shopping Cart</h2>
                    <p>You have {Obj.totalProducts ? Obj.totalProducts : 0} items in Cart</p>
                </div>

                <hr />
                <div className='cart-item-cont' >
                    {
                        data?.map((item, index) => {
                            return <div className='products' key={index} >
                                <div className='item-prop'  style={{ width:'100px',lineHeight: '16px' }}>
                                    <h4>Title</h4>
                                    <p>{item.title ? item.title : 0}</p>
                                </div>
                                <div className='item-prop'>
                                    <h4>Quantity</h4>
                                    <p>{item.quantity ? item.quantity : 0}</p>
                                </div>
                                <div className='item-prop'>
                                    <h4>Price</h4>
                                    <p>{item.price ? item.price : 0}Rs</p>
                                </div>
                            </div>
                        })
                    }
                </div>
                <hr />
                <h5>Total: {Obj.total ? Obj.total : 0}Rs</h5>
            </div>
        </>
    )
}

export default Cart

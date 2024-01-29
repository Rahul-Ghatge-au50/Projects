import React, { useContext, useState } from 'react'
import TableComp from './TableComp';
import axios from 'axios';
import { ResturantContext } from '../../ContextApi/Context';


function Home() {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    const {addResturant} = useContext(ResturantContext);

    const handleSubmit =async (e) => {
        e.preventDefault();
        const data = {
            name:name,
            location:location,
            price_range:priceRange
        }
        const res = await axios.post('http://localhost:5000/api/resturants',data);
        addResturant(res.data.data);
        setName('');
        setLocation('');
        setPriceRange('Price Range');
    }

    return (
        <>
            <div>
                <h1 className="font-weight-light display-1 text-center">
                    Restaurants
                </h1>
            </div>
            <div className='container'>
                <div className="mb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="form-control"
                                    type="text"
                                    placeholder="location"
                                />
                            </div>
                            <div className="col">
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="custom-select my-1 mr-sm-2"
                                >
                                    <option disabled>Price Range</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <button type='submit' className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                <TableComp />
            </div>
        </>
    )
}

export default Home

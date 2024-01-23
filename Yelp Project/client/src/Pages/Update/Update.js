import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


function Update() {

  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [priceRange,setPriceRange] = useState('');
  const [hotel,setHotel] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const getData =async () => {
      const res = await axios.get(`http://localhost:5000/api/resturants/${id}`);
      setHotel(res.data.data);
    }
    getData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name:name ? name : hotel[0].name,
      location:location ? location : hotel[0].location,
      price_range:priceRange ? priceRange : hotel[0].price_range
    }

    const res = await axios.put(`http://localhost:5000/api/resturants/${id}`,data);
    console.log(res);
    navigate('/')
  }

  return (
   <>
    <h1 className='text-center' >Update Resturant</h1>
      <div className='container mt-5' >
      <h1>{hotel[0]?.name}</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder={hotel[0]?.name}
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            placeholder={hotel[0]?.location}
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            placeholder={hotel[0]?.price_range}
            type="number"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
   </>
  )
}

export default Update

import React, { useContext, useEffect, useState } from 'react'
import { ResturantContext } from '../../ContextApi/Context'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Reveiw from '../../Component/Reveiw';
import StarRating from '../../Component/StarRating';

function Detailed() {
  const {resturant} = useContext(ResturantContext);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reveiws,setReveiws] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:5000/api/resturants/${id}`);
      if(res){
        setHotel(res.data.data);
        // console.log(hotel);
      }
    }
    getData();
    const getReveiw = async () => {
      const res = await axios.get(`http://localhost:5000/api/resturants/${id}`);
      // console.log(res.data.reveiws);
      if(res){
        setReveiws(res.data.reveiws);
      }
    }
    getReveiw();
  });
    
  const handleSubmit =async (e) => {
    e.preventDefault();
    const data = {
      name:name,
      reveiw:reviewText,
      rating:rating
    }

    const res = await axios.post(`http://localhost:5000/add/reveiw/${id}`,data);
    setName('');
    setRating('');
    setReviewText('');
  }


  return (
    <>
      <div>
        <h1 className='font-weight-light display-1 text-center'>{hotel[0]?.name}</h1>
        <h4 className='font-weight-light text-center' style={{color:'yellow',fontSize:'20px',fontWeight:'500'}}>
        <StarRating rating={hotel[0]?.average_rating}/>
        {hotel[0]?.count}</h4>
        <div className='mt-3 row row-cols-3 mb-2 ml-4' >
        {
          reveiws?.map((item,id) => {
            return <Reveiw key={id} item={item} />
          })
        }
          
        </div>
        <div className="mb-2" style={{border:'1px solid lightGray',borderRadius:'20px',margin:'0px 50px 0px 20px',padding:'20px'}}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-8">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="rating">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  id="rating"
                  className="custom-select"
                >
                  <option disabled>Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Review">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                id="Review"
                className="form-control"
                placeholder='Message....'
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Detailed

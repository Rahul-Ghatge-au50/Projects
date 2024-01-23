import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { ResturantContext } from '../../ContextApi/Context';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../Component/StarRating';

function TableComp() {

    const { resturant, setResturant } = useContext(ResturantContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/resturants');
                setResturant(res.data.data);
            } catch (err) { }
        }
        fetchData();
    })

    const handleDelete = async (e,id) => {
        e.stopPropagation();
        await axios.delete(`http://localhost:5000/api/resturants/${id}`);
    }

    const handleUpdate = async (e,id) => {
        e.stopPropagation();
        navigate(`/resturant/update/${id}`)
    }

    const handleResturant = (id) => {
        console.log(id);
        navigate(`/resturant/${id}`);
    }

    return (
        <>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Resturant</th>
                            <th scope="col">Location</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Ratings</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resturant?.map((item, id) => {
                                return (
                                    <tr onClick={() => handleResturant(item.id)} key={id}>
                                        <td style={{cursor:'pointer'}}>{item.name}</td>
                                        <td style={{ textTransform: 'uppercase',cursor:'pointer' }} >{item.location}</td>
                                        <td>{item.price_range}</td>
                                        <td style={{color:'yellow'}}><StarRating rating={item.average_rating} />({item.count})</td>
                                        <td><button onClick={(e) => handleUpdate(e,item.id)} className='btn btn-warning'>
                                            Update
                                        </button></td>
                                        <td><button onClick={(e) => handleDelete(e,item.id)} className='btn btn-danger'>
                                            Delete
                                        </button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableComp;

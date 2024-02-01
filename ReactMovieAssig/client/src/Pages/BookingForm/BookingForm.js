import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './bookingform.css';



function BookingForm() {

    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [people,setPeople] = useState('');
    const [data, setData] = useState([]);
    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://api.tvmaze.com/search/shows?q=all');
            setData(res.data);
        }
        getData();


        //loppping to get single movie show
        for (let i = 0; i < data.length; i++) {
            if (data[i].show.id + "" === id) {
                setMovieData(data[i]);
            }
        }
    }, [movieData, data, id])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data ={
            name:username,
            email:email,
            number:number,
            movieName:movieData.show.name ? movieData.show.name : "",
            people:people
        }
        localStorage.setItem("Booking",JSON.stringify(data));
        alert('Booking is Done');
        console.log(data);
        setUsername('');
        setEmail('');
        setEmail('');
        setNumber('');
        setPeople('');
    }

    return (
        <>

            <div className="booking-cont" >
            {
                movieData.show ? <div className="movie-detail">
                    <h3>{movieData.show.name}</h3>
                    <p>Language : {movieData.show.language}</p>
                    <p>Rating : {movieData.show.rating.average}</p>
                </div> : " "
            }
                <div className="booking-form">
                    <form onSubmit={handleSubmit} >
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            className="input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Enter your number"
                            value={number}
                            className="input"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Enter number of People"
                            value={people}
                            className="input"
                            onChange={(e) => setPeople(e.target.value)}
                        />
                        <input type="submit" className="form-btn" />
                    </form>
                </div>
            </div>

        </>
    )
}

export default BookingForm;
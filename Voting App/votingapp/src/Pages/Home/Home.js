import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

function Home (){

    const [count1,setCount1] = useState();
    const [count2,setCount2] = useState();
    const [count3,setCount3] = useState();
    const [count4,setCount4] = useState();

    //console.log(count1);
    useEffect(() => {
        const votes = async () => {
            const res = await axios.get('http://localhost:5000/candidateVote');
            const [cand1,cand2,cand3,cand4] = res.data;
            setCount1(cand1.count);
            setCount2(cand2.count);
            setCount3(cand3.count);
            setCount4(cand4.count);
        }
        votes();
    },[])

    return(
        <div className="home">
            <p>Candidate 1 vote count = {count1} </p>
            <p>Candidate 2 vote count = {count2} </p>
            <p>Candidate 3 vote count = {count3} </p>
            <p>Candidate 4 vote count = {count4} </p>
        </div>
    )
}

export default Home;
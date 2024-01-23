import { useContext, useEffect, useState } from "react";
import './voting.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/context";
import axios from "axios";




function Voting() {

    const navigate = useNavigate();
    const { user } = useContext(Context);
    const email = user?.email;
    //console.log(user);
    const [voting, setVoting] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: email,
            candiate: voting,
            Boolean: true
        }
        navigate('/');
        const res = await axios.post('http://localhost:5000/votedUser', user);
        //console.log(res);
    }

    return (
        <>
            <div className="Voting">
                <form onSubmit={handleSubmit} className="voting-form" >
                    <div className="candidate">
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate1"
                                onChange={(e) => setVoting(e.target.value)}
                            /> Candidate 1
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate2"
                                onChange={(e) => setVoting(e.target.value)}
                            /> Candidate 2
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate3"
                                onChange={(e) => setVoting(e.target.value)}
                            /> Candidate 3
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate4"
                                onChange={(e) => setVoting(e.target.value)}
                            /> Candidate 4
                        </label>
                        <button type="submit" className="sub-btn"  >
                            Vote
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Voting;
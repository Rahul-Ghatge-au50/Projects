import { useState } from "react";
import './voting.css';
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";



function Voting() {

    const [home, setHome] = useState(false);
    const navigate = useNavigate();
    var [count1, setCount1] = useState(0);
    var [count2, setCount2] = useState(0);
    var [count3, setCount3] = useState(0);
    var [count4, setCount4] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
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
                                onChange={(e) => setCount1(count1 + 1)}
                            /> Candidate 1
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate2"
                                onChange={(e) => setCount2(count2 + 1)}
                            /> Candidate 2
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate3"
                                onChange={(e) => setCount3(count3 + 1)}
                            /> Candidate 3
                        </label>
                        <label style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name="vote"
                                value="Candidate4"
                                onChange={(e) => setCount4(count4 + 1)}
                            /> Candidate 4
                        </label>
                        <button type="submit" className="sub-btn"  >
                            Vote
                        </button>
                    </div>
                </form>
            </div>

            {
                home && <Home count1={count1} count2={count2} count3={count3} count4={count4} />
            }

        </>
    )
}
export default Voting;
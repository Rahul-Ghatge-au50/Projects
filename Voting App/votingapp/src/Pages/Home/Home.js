import './home.css';

function Home ({count1,count2,count3,count4}){

    console.log(count1);

    return(
        <div className="home">
            <p>Candidate 1 vote count {count1}</p>
            <p>Candidate 2 vote count {count2}</p>
            <p>Candidate 3 vote count {count3}</p>
            <p>Candidate 4 vote count {count4}</p>
        </div>
    )
}

export default Home;
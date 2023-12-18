import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <h1>
                Home Page
            </h1>
            <button>
                <Link to={'Login'} >
                    Login
                </Link>
            </button>

        </>

    )
}

export default Home

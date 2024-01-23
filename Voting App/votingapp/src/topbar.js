import React from 'react'
import { Outlet } from 'react-router-dom'

function Topbar() {
    return (
        <>
            <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'0px'}}>
                <div>
                    <h1>Voting App</h1>
                </div>
            </div>

            <main>
                <Outlet />
            </main>
        </>

    )
}

export default Topbar

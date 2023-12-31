import React from 'react'
import hum1 from '../images/human-1.svg'
import hum2 from '../images/human-2.svg'
import str1 from '../images/stars.svg'
import { Link } from 'react-router-dom'
const Dash = () => {
    return (
        <div className='dash'>
            <div className="dashcont">
                <h1>Write your thoughts down as they come to you!</h1>
                
                <p>Keeper is a simple to use notes taking app similar to google notes made with MoongoDB Express React Node (MERN). </p>
                <Link to={"/login"}>
                <button style={{ backgroundColor: "#1f3578", color: "white" }} className="button">Get Keeper, It's free</button>
                </Link>
            </div>
            <div style={{ left: "0", bottom: "0" }} className="dashimg "><img style={{ height: "70vh" }} src={hum1} alt='img'></img></div>
            <div style={{ right: "0", bottom: "0" }} className="dashimg "><img style={{ height: "70vh" }} src={hum2} alt='img'></img></div>
            <div style={{ left: "30%", top: "10%" }} className='dashimg'><img src={str1} alt='img'></img></div>
            <div style={{ right: "25%", top: "40%" }} className='dashimg'><img style={{ height: "60px", }} src={str1} alt='img'></img></div>
        </div>
    )
}

export default Dash

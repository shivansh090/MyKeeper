import React from "react";
import { Link } from "react-router-dom";
function Header({ isloggedin, username, setSignUp, isSignUp }) {
    return (
        <div>
            <header>
                <h1 style={isloggedin ? { color: "white" } : {}}>My-Keeper</h1>
                <div className="right">
                    {!isloggedin ? !isSignUp ? <>
                        <Link to={"/login"}>
                            <button onClick={setSignUp} style={{ color: "#1f3578" }} className="button">Sign Up</button>
                        </Link></> : <>
                        <Link to={"/login"}>
                            <button onClick={setSignUp} style={{ backgroundColor: "#1f3578", color: "white" }} className="button">Login</button>
                        </Link>
                    </> : <div className="profile">
                        <h2><i style={isloggedin ? { color: "white" } : {}} class="bi bi-person-circle"></i></h2>
                        <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p>
                    </div>
                    }
                    <Link to={"/"}>
                        <button className="btn-home"><i style={{ fontSize: "30px" }} class="bi bi-house-door-fill"></i></button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header;
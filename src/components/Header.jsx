import React from "react";
import { Link } from "react-router-dom";
function Header({isloggedin,username}) {
    
    return (
        <div>
            <header>
                <h1 style={isloggedin?{color:"white"}:{}}>My-Keeper</h1>
                <div className="right">
         {!isloggedin? <>
                    <button style={{ color: "#1f3578" }} className="button">Sign Up</button>
                    
                    <Link to={"/login"}>
                        <button style={{ backgroundColor: "#1f3578", color: "white" }} className="button">Sign in</button>
                    </Link>
                    </>: <div className="profile">
                    <h2><i style={isloggedin?{color:"white"}:{}} class="bi bi-person-circle"></i></h2>
                    <h5>{username.charAt(0).toUpperCase() + username.slice(1)}</h5>
                    </div>
         }
                </div>
            </header>
        </div>
    )
}

export default Header;
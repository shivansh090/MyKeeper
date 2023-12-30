import React from "react";
function Header() {
    return (
        <div>
            <header>
                <h1>My-Keeper</h1>
                <div className="right">
                
                
                    <button style={{color:"#1f3578"}}  className="button">Sign Up</button>
                
                <button style={{backgroundColor:"#1f3578",color:"white"}} className="button">Sign in</button>
                <h1><i class="bi bi-person-circle"></i></h1>
                </div>
            </header>
        </div>
    )
}

export default Header;
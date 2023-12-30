import Header from "./Header"
import Footer from "./Footer"
import React from "react";
import notes from "../notes"

function App(){
    return(<div>
        <Header></Header>
        {notes.map(x => (
            <Note title={x.title} body={x.body}></Note >
        ))}
       
        </div>
    )
}


export default App;
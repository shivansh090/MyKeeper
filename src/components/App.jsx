import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import React from "react";
import notes from "../notes"

function App(){
    return(<div>
        <Header></Header>
        {notes.map(x => (
            <Note title={x.title} body={x.body}></Note >
        ))}
       
        <Footer></Footer>
        </div>
    )
}

export default App;
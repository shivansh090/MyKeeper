import React from "react";


function Note(params) {
    return (<div className="note" contentEditable="true" spellCheck="false">
       <h1>{params.title}</h1>
       <p>{params.body}</p>
    </div>
    )
}

export default Note;
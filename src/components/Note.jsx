import React from "react";


function Note(params) {

    function deleteit(e) {
        e.preventDefault();
        const data_id = e.currentTarget.getAttribute("id");
        fetch(process.env.REACT_APP_API_URL+'/notes/delete',{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           _id:data_id
          }),
        }).then(()=>{
          params.refresh();
        })}
      

  return (
    <div className="note" spellCheck="false">
      <h1>{params.title}</h1>
      <p>
        {params.body}
        <button
          id={params.mykey}
          onClick={deleteit}
          className="btndelete"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </p>
    </div>
  );
}

export default Note;

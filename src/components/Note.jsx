import React from "react";


function Note(params) {
  
    function updatenote(){
    params.setTitleValue(params.title);
    params.setNoteValue(params.body);
    params.updateStatus("UPDATE");
    params.setIdValue(params.mykey)
    }
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
       <a onClick={updatenote} style={{textDecoration: "none",color: "inherit"}}
    data-bs-toggle="collapse" href="#collapseWidthExample" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
    <h1>{params.title}</h1></a>
      
      <p>
      <a onClick={updatenote} style={{textDecoration: "none",color: "inherit"}}
    data-bs-toggle="collapse" href="#collapseWidthExample" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
        {params.body}</a>
        
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

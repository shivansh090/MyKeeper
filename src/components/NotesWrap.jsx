import React, { useState, useEffect } from 'react';
import Note from "./Note";
import './NotesWrap.css'


const NotesWrap = ({username}) => {
  const [myId, setmyId] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [noteValue, setNoteValue] = useState('');
  const fetchData = async () => {
    try {
      // Step 1: Fetch user information based on the username
      const userResponse = await fetch(process.env.REACT_APP_API_URL + `/api/users?username=${username}`);
      const userData = await userResponse.json();
  
      // Assuming the response has a userId property
      // console.log(userData.userId);
      setmyId(userData.userId);
      fetchNotes();
    } catch (error) {
      console.error(error);
      setError('Error fetching user information');
    }
  };
  const fetchNotes = async () => {
    try {
      // Step 2: Fetch notes based on the myId
      const notesResponse = await fetch(process.env.REACT_APP_API_URL + `/notes/${myId}`);
      const notesData = await notesResponse.json();

      setNotes(notesData);
      // console.log(notesData);
    } catch (error) {
      console.error(error);
      setError('Error fetching notes');
    }
  };

  useEffect(() => {
    // Check if myId is not an empty string before making the second fetch
    if (myId !== '') {
      fetchNotes();
    }
  }, [myId]); // Run this effect whenever myId changes
  
  // Trigger the initial fetch when the component mounts
  useEffect(() => {
    fetchData();
  }, [username]); // Run this effect whenever username changes
  

    const handleAdd = async (event) => {
      event.preventDefault();
      // const { heading, description } = event.target.elements;
      // setTitleValue(document.querySelector('#exampleFormControlInput1').value);
      // setNoteValue(document.querySelector('#exampleFormControlTextarea1').value);

  // console.log('Title:', titleValue);
  // console.log('Note:', noteValue);
      try {
        const response = await fetch((process.env.REACT_APP_API_URL+'/notes/'+myId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heading: titleValue, description: noteValue }),
        });
        // console.log("first")
        const data = await response.json();
        // console.log(data);
        fetchData();
      } catch (error) {
        console.error('Error:', error);
      }
      
    };
  
    return (
        <div className="noteswrapper">
            {notes.map(x => (
                <Note mykey={x._id} title={x.heading} body={x.description} refresh={fetchData}></Note >
            ))}
            <div>
            <div >
        <div style={{width:"340px",height:"290px" ,position:"fixed",right:"150px", bottom:"160px"}} className="collapse collapse-up" id="collapseWidthExample">
            <div className="card card-body" >

              <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" class="btn-close" aria-label="Close"></button>

              <div class="mb-3">
               <label for="exampleFormControlInput1" class="form-label">Title</label>
               <input value={titleValue} onChange={(e) => setTitleValue(e.target.value)} type="" name='title' class="form-control" id="exampleFormControlInput1" placeholder="New Note.."/>
              </div>

              <div class="mb-3">
               <label for="exampleFormControlTextarea1" class="form-label">Note</label>
               <textarea value={noteValue} onChange={(e) => setNoteValue(e.target.value)} class="form-control" name='note' id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
                  
              <button onClick={handleAdd} type='submit' className='button btn-add'data-bs-toggle="collapse" data-bs-target="#collapseWidthExample">
                      Add
              </button>

            </div>
        </div>
    </div>
            </div>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample"
            aria-expanded="false" aria-controls="collapseWidthExample"  className="button plusbutton"><i className="plus bi bi-plus-circle-fill"></i></button>

        </div>
    )
  };
  

export default NotesWrap
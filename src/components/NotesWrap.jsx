import React, { useState, useEffect } from 'react';
import Note from "./Note";
import './NotesWrap.css'
import { useLocation } from 'react-router-dom';

const NotesWrap = ({ username }) => {
  const [myId, setMyId] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [noteValue, setNoteValue] = useState('');
  const [IdValue, setIdValue]= useState('');
  const [status, updateStatus] = useState("ADD");

  console.log(useLocation().pathname);
  // Function to fetch user information based on the username
  const fetchData = async () => {
    try {
      const userResponse = await fetch(process.env.REACT_APP_API_URL + `/api/users?username=${username}`);
      const userData = await userResponse.json();
      
      setMyId(userData.userId);
      fetchNotes(); // Fetch notes once user information is retrieved
    } catch (error) {
      console.error(error);
      setError('Error fetching user information');
    }
  };

  // Function to fetch notes based on the user's ID
  const fetchNotes = async () => {
    try {
      const notesResponse = await fetch(process.env.REACT_APP_API_URL + `/notes/${myId}`);
      const notesData = await notesResponse.json();
      
      setNotes(notesData);
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

  // Trigger the initial fetch when the component mounts or username changes
  useEffect(() => {
    fetchData();
  }, [username]);

  // Function to handle adding a new note
  const handleAdd = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch((process.env.REACT_APP_API_URL + '/notes/add/' + myId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heading: titleValue, description: noteValue }),
      });

      const data = await response.json();
      fetchData(); // Refresh notes after adding a new one
    } catch (error) {
      console.error('Error:', error);
    }
    setTitleValue('');
    setNoteValue('');
  };

  //Function to handle updating an existing note
  const handleUpdate = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch((process.env.REACT_APP_API_URL + '/notes/update' ), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:IdValue, heading: titleValue, description: noteValue }),
      });

      const data = await response.json();
      fetchData(); // Refresh notes after adding a new one
    } catch (error) {
      console.error('Error:', error);
    }
    setTitleValue('');
    setNoteValue('');
  };

  return (
    <div className="noteswrapper">
      {notes.map(x => (
        <Note mykey={x._id} title={x.heading} body={x.description} refresh={fetchData}
        setTitleValue={setTitleValue} setNoteValue={setNoteValue} updateStatus={updateStatus}
        setIdValue={setIdValue}></Note>
      ))}
      <div>
        <div>
          <div style={{ width: "340px", height: "290px", position: "fixed", right: "150px", bottom: "160px" }} className="collapse collapse-up" id="collapseWidthExample">
            <div className="card card-body" >
              <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" className="btn-close" aria-label="Close"></button>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input value={titleValue} onChange={(e) => setTitleValue(e.target.value)}  name='title' className="form-control" id="exampleFormControlInput1" placeholder="New Note.." />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Note</label>
                <textarea value={noteValue} onChange={(e) => setNoteValue(e.target.value)} className="form-control" name='note' id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <button onClick={(status=="ADD")?handleAdd:handleUpdate}
              
              type='submit' className='button btn-add' data-bs-toggle="collapse" data-bs-target="#collapseWidthExample">
                {status}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className=" btn-primary plusbutton" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" >
        <i className="plus bi bi-plus-circle-fill"></i>
      </button>
    </div>
  );
};

export default NotesWrap;

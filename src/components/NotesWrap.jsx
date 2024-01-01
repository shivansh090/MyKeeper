import React, { useState, useEffect } from 'react';
import Note from "./Note";
// import notes from "../notes"


const NotesWrap = ({username}) => {
    const [myId, setmyId] = useState('');
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    
    const fetchData = async () => {
      try {
        // Step 1: Fetch user information based on the username
        const userResponse = await fetch(process.env.REACT_APP_API_URL + `/api/users?username=${username}`);
        const userData = await userResponse.json();
    
        // Assuming the response has a userId property
        console.log(userData.userId);
        setmyId(userData.userId);
      } catch (error) {
        console.error(error);
        setError('Error fetching user information');
      }
    };
    
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          // Step 2: Fetch notes based on the myId
          const notesResponse = await fetch(process.env.REACT_APP_API_URL + `/notes/${myId}`);
          const notesData = await notesResponse.json();
    
          setNotes(notesData);
          console.log(notesData);
        } catch (error) {
          console.error(error);
          setError('Error fetching notes');
        }
      };
    
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
      console.log('clicked');
      try {
        const response = await fetch((process.env.REACT_APP_API_URL+'/notes/'+myId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heading: "heading.value", description: "description.valuedescription.valuedescription.value" }),
        });
        console.log("first")
        const data = await response.json();
        console.log(data);
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
            <button onClick={handleAdd} className="button plusbutton"><i className="plus bi bi-plus-circle-fill"></i></button>

        </div>
    )
  };
  

export default NotesWrap
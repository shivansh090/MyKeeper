import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import humimg from '../images/human-3.svg';

const Login = ({ isAuthenticated, onLogin, setusername }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: uname.value, password: pass.value }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        onLogin(); // Call the callback function to update isAuthenticated in App.jsx
        setusername(uname.value);
        navigate('/user'); // Redirect to the dashboard
      } else {
        setErrorMessages({ name: 'login', message: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessages({ name: 'login', message: 'An error occurred during login' });
    }
  };


  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input placeholder='Username' type="text" name="uname" required />
          <i class="bi inputicon bi-person-fill"></i>
          {renderErrorMessage('uname')}
        </div>
        
        <div className="input-container">
          <label>Password </label>
          <input placeholder='Password' type="password" name="pass" required />
          <i style={{fontSize:"18px"}} class="bi inputicon bi-shield-lock-fill"></i>
          {renderErrorMessage('pass')}
        </div>
        <div className="button-container">
          <input type="submit" value='login'/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className='loginimg'>
        <img src={humimg} alt="" srcset="" />
      </div>
      <div className="login-form">
        <div className="title">
          
           <header style={{background:"transparent",boxShadow:"none"}}>
            <h1 style={{color:"white" ,fontSize:"30px", letterSpacing:"-1px"}} >My-Keeper</h1>
            </header>
        </div>
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          <>
            {renderForm}
            {renderErrorMessage('login')}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

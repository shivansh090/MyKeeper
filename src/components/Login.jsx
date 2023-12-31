import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = ({ isAuthenticated, onLogin, setusername }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    try {
      const response = await fetch(process.env.REACT_APP_REACT_APP_API_URL+'/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: uname.value, password: pass.value }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("first")
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
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
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

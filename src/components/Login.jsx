import React, { useState } from 'react';
import './Login.css';
import { useNavigate , useLocation} from 'react-router-dom';
import humimg from '../images/human-3.svg';

const Login = ({ isAuthenticated, onLogin, setusername }) => {
  const [errorMessages, setErrorMessages] = useState({name: 'login',message:"Forgot username/password ?  Login with email"});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignUp, setSignUp]= useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, pass1 } = event.target.elements;
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: uname.value, password: pass1.value }),
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
  const addUser = async (event) => {
    event.preventDefault();
    const { uname,email, pass ,pass1 } = event.target.elements;
    if(pass!==pass1){
        setErrorMessages({ name: 'login', message: "Passwords doesn't match" });
        return;
    }
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/users/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: uname.value,email:email.value, password: pass.value }),
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
      <form onSubmit={isSignUp? addUser: handleSubmit}>
      <div className="input-container">
          
          <input placeholder='username' autoComplete='off' type="text" name="uname" required />
          <i style={{fontSize:"23px"}} class="bi inputicon bi-person-fill"></i>
          {renderErrorMessage('uname')}
        </div>
        { isSignUp ? 
          <div className="input-container">
          <input placeholder='email' autoComplete='off' type="email" name="email" required />
          <i class="bi inputicon bi-envelope-at-fill"></i></div>
          :
         <div></div> }

        <div className="input-container">
          <input placeholder='password' autoComplete='off' type="password" name="pass1" required />
          <i style={{fontSize:"18px"}} class="bi inputicon bi-shield-lock-fill"></i></div>
          { isSignUp ?  
        <div className="input-container">
          <input placeholder='re enter password' type="password" name="pass2" required />
          <i style={{fontSize:"18px"}} class="bi inputicon bi-shield-lock-fill"></i>
          {renderErrorMessage('pass')}
        </div>
        :
        <div></div> }
        <div className="button-container">
          <input type="submit" value={isSignUp? 'Sign Up' :'Login'}/>
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

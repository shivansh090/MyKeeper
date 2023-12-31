import Header from "./Header";
import Footer from "./Footer"
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import Login from './Login';
import Dash from './Dash'; // Import your Dash component
import NotesWrap from './NotesWrap';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername]=useState('');
  const handleLogin = () => {
    // Perform login logic (set isAuthenticated to true)
    setIsAuthenticated(true);
  };
 const handleUsername = (prop) =>{
    setUsername(prop);
 }
  const handleLogout = () => {
    // Perform logout logic (set isAuthenticated to false)
    setIsAuthenticated(false);
  };
  function PrivateRoute({ children }) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  }
  return (
    <div>
       <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Dash />} />
      <Route path="/login" element={<Login isAuthenticated={isAuthenticated} onLogin={handleLogin} setusername={handleUsername}/>}/>  
      
      {/* <PrivateRoute path="/user" component={NotesWrap} isAuthenticated={isAuthenticated} /> */}
      <Route
          path="/user"
          element={
            <PrivateRoute>
              <NotesWrap username={username}/>
            </PrivateRoute>
          }
        />
      <Route path="/users" element={<NotesWrap username={"shivansh"}/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    <Footer />
  
</Router>
        
    </div>
);
}


export default App;

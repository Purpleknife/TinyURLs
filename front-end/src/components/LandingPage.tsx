import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import Login from './Login';
import Register from './Register';

import './LandingPage.scss';

const LandingPage = () => {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <div className="LandingPage">
      <Button className='login' onClick={handleLoginShow}>
        Login
      </Button>
      <Login handleClose={handleLoginClose} show={showLogin}/>
      
      <Button className='login' onClick={handleRegisterShow}>
        Register
      </Button>
      <Register handleClose={handleRegisterClose} show={showRegister}/>
    </div>
  );
}

export default LandingPage;

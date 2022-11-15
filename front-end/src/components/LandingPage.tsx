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
    <div className="landing_page">

      <div className='navbar_lp'>
        <div className='logo'>
          TinyURLs<i className="fa-solid fa-scissors"></i>
        </div>

        <div className='navbar_btn_lp'>
            <Button className='login_register' onClick={handleLoginShow}>
              Login
            </Button>
            <Login handleClose={handleLoginClose} show={showLogin}/>
            &nbsp;&nbsp;
            <Button className='login_register' onClick={handleRegisterShow}>
              Register
            </Button>
            <Register handleClose={handleRegisterClose} show={showRegister}/>
          </div>

      </div>
      
      <div className='container_lp'>
        <div className='catchphrase'>
          
          <span>
            With TinyURLs, you can shorten your URLs and save them in your Dashboard.
            <br />
            Login or Register to get started.
          </span>

          <div className='getting_started'>
            <Button className='login_register' onClick={handleRegisterShow}>
              Getting Started
            </Button>
            <Register handleClose={handleRegisterClose} show={showRegister}/>
          </div>
        </div>

        <div className='landing_img'>
          <img
            src='images/url.png'
            alt='logo-img'
          />
        </div>
      </div>
      
      
    </div>
  );
}

export default LandingPage;

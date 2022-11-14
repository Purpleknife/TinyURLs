import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useCookies } from 'react-cookie';

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const username = cookies.username;

  const navigate = useNavigate();

  const logout = () => {
    axios.get('/logout')
      .then(data => {
        removeCookie('username', {path: '/'});
        removeCookie('user_id', {path: '/'});
        removeCookie('logged_in', {path: '/'});
        navigate('/');
      })
  };

  return (
    <nav>
      <div className='logo'>
        TinyURLs
      </div>
      <div className='welcome'>
        Welcome, {username}!
      </div>
      <button type='submit' onClick={logout}>Logout</button>
    </nav>
  );
}
 
export default NavBar;
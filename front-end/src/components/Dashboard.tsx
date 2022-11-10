import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const username = cookies.username;
  const user_id = cookies.user_id;

  const navigate = useNavigate();

  const loadDashboard = async() => {
    await axios.get(`/dashboard/${user_id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const logout = () => {
    axios.get('/logout')
      .then(data => {
        removeCookie('username', {path: '/'});
        removeCookie('user_id', {path: '/'});
        removeCookie('logged_in', {path: '/'});
        navigate('/');
      })
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      Hello from Dash!
      {username}

      <button type='submit' onClick={logout}>Logout</button>
    </div>
  );
}
 
export default Dashboard;
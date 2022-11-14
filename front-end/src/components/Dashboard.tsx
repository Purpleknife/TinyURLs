import React, { useEffect } from 'react';

import axios from 'axios';

import { useCookies } from 'react-cookie';

import NavBar from './NavBar';
import ShortenURLs from './ShortenURLs';


const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const user_id = cookies.user_id;

  const loadDashboard = async() => {
    await axios.get(`/dashboard/${user_id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <NavBar />
      <ShortenURLs />
    </div>
  );
}
 
export default Dashboard;
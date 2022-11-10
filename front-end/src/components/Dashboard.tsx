import React, { useEffect } from 'react';
import axios from 'axios';

import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const username = cookies.username;
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
      Hello from Dash!
      {username}
    </div>
  );
}
 
export default Dashboard;
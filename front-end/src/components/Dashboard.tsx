import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useCookies } from 'react-cookie';

import NavBar from './NavBar';
import ShortenURLs from './ShortenURLs';
import OneShortURL from './OneShortURL';


const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const user_id = cookies.user_id;

  const [allURLs, setAllURLs] = useState<any>(null);

  const loadDashboard = async() => {
    await axios.get(`/dashboard/${user_id}`)
      .then(res => {
        console.log(res.data);
        setAllURLs(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  interface URL {
    id: string | number;
    title: string;
    long_url: string;
    short_url: string;
    date_created: string;
  }

  const urlList = allURLs.map((url: URL) => {
    return (
      <OneShortURL
        key={url.id}
        id={url.id}
        title={url.title}
        long_url={url.long_url}
        short_url={url.short_url}
        date={url.date_created}
        fetch={loadDashboard}
      />
    )
  })

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <NavBar />
      <ShortenURLs fetch={loadDashboard}/>
      {urlList}
    </div>
  );
}
 
export default Dashboard;
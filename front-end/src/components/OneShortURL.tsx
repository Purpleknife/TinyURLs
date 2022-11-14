import React from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import './OneShortURL.scss';


interface OneShortURLProps {
  id: string | number;
  title: string;
  long_url: string;
  short_url: string;
  date: string;
  fetch: () => void;
}

const OneShortURL = (props: OneShortURLProps) => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const user_id = cookies.user_id;

  const deleteShortURL = () => {
    axios.delete(`${user_id}/${props.id}`)
      .then(res => {
        console.log('Short URL deleted.', res.data);
        props.fetch();
      })
      .catch(error => {
        console.log(error.message);
      });
  };


  return (
    <div className='container'>
      <div className='one_card'>
        <i onClick={deleteShortURL} className="fa-solid fa-trash"></i>
        <span className='title'>{props.title}</span>
        <span className='date'><i className="fa-solid fa-calendar-days"></i>&nbsp;{props.date.slice(0, 10)}</span>
          <br />
        <span className='long_url'>
          <strong><i className="fa-solid fa-link"></i></strong>&nbsp;&nbsp;
          {props.long_url}
        </span>

        <span className='short_url'>
          <strong><i className="fa-solid fa-scissors"></i></strong>&nbsp;&nbsp;
          {props.short_url}
        </span>      
      </div>
    </div>
  );
}
 
export default OneShortURL;
import React from 'react';

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
  return (
    <div className='container'>
      <div className='one_card'>
        <i className="fa-solid fa-trash"></i>
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
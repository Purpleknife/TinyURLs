import React from 'react';


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
      </div>
      {props.id}
      {props.title}
      {props.long_url}
      {props.short_url}
      {props.date}
    </div>
  );
}
 
export default OneShortURL;
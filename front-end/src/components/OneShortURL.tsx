import React, { useState } from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import './OneShortURL.scss';

import CountVisits from './CountVisits';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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

  const [counter, setCounter] = useState<number>(0);
  const [incrementCount, setIncrementCount] = useState<number>(0);

  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  

  //Copy URL to clipboard:
  const copyURL = () => {
    navigator.clipboard.writeText(props.short_url);
    setUrlCopied(!urlCopied);
  };

  //Delete a short URL:
  const deleteShortURL = () => {
    return axios.delete(`${user_id}/${props.id}`)
      .then(res => {
        console.log('Short URL deleted.', res.data);
        props.fetch();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  //Increment the number of visits of a specific short URL whenever it gets clicked:
  const incrementVisitsCount = () => {
    return axios.post(`/visits/${props.id}`)
      .then(res => {
        console.log('Edit', res.data);
        setIncrementCount(prev => prev + 1);
      })
      .catch(error => {
        console.log(error.message);
      });
  };


  //Redirect from short URL to long URL:
  const redirectToLongURL = () => {
    incrementVisitsCount();
    window.open(props.long_url);
  };


  return (
    <div className='container'>
      <div className='one_card'>
        <div className='options'>
          <i className="fa-solid fa-pen-to-square"></i>
          <i data-testid='delete' onClick={deleteShortURL} className="fa-solid fa-trash"></i>
        </div>
        <span className='title'>{props.title}</span>
        <span className='date'><i className="fa-solid fa-calendar-days"></i>&nbsp;{props.date.slice(0, 10)}</span>
          <br />
        <span className='long_url'>
          <strong><i className="fa-solid fa-link"></i></strong>&nbsp;&nbsp;
          {props.long_url}
        </span>

        <span data-testid='short_url' className='short_url' >
          <strong><i className="fa-solid fa-scissors"></i></strong>&nbsp;&nbsp;
          <span id='tiny_url' onClick={redirectToLongURL}>{props.short_url}</span>

          <OverlayTrigger
            key='bottom'
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-bottom'>
                {urlCopied ? 'Copied!' : 'Copy to clipboard.'}
              </Tooltip>
            }
          >
            <i onClick={copyURL} className="fa-solid fa-copy"></i>
          </OverlayTrigger>
        </span>
        <CountVisits url_id={props.id} counter={counter} setCounter={setCounter} incrementCount={incrementCount} />    
      </div>
    </div>
  );
}
 
export default OneShortURL;
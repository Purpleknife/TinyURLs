import React, { useRef, useState } from 'react';

import axios from 'axios';

import { useCookies } from 'react-cookie';

import { generateRandomShortURL } from '../helpers/helpers';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './ShortenURLs.scss';

interface ShortenURLsProps {
  fetch: () => void;
};

const ShortenURLs = (props: ShortenURLsProps) => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const user_id = cookies.user_id;

  const [shortURL, setShortURL] = useState<any>(null);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  

  const longURLInput = useRef<any>(null);
  const title = useRef<any>(null);

  //Save to database:
  const showSave = () => {
    setSave(!save);
  }

  //Copy URL to clipboard:
  const copyURL = () => {
    navigator.clipboard.writeText(shortURL);
    setUrlCopied(!urlCopied);
  };


  //Shorten URL:
  const shortenURL = () => {    
    const generatedShortURL: string = generateRandomShortURL();

    setShortURL(generatedShortURL);
  };


  //Redirect from short URL to long URL:
  const redirectToLongURL = () => {
    const longURL = longURLInput.current.value;

    window.open(longURL);
  };


  //Save generated URL to database:
  const saveToDatabase = () => {
    return axios.post(`/dashboard/${user_id}`, {
      long_url: longURLInput.current.value,
      short_url: shortURL,
      title: title.current.value
    })
      .then((res) => {
        console.log('Data saved', res.data);
        props.fetch();
      })
      .catch((error) => {
        console.log(error.message);
      })
  };


  return (
    <div className='shorten_url'>
      <div className='long_url_input'>
        <input
          placeholder='Enter your URL'
          type='longurl'
          name='longurl'
          ref={longURLInput}
        />&nbsp;
      <button data-testid='shorten' type='submit' onClick={shortenURL}>Shorten</button>
      </div>
      {shortURL && 
      <div>
        <div data-testid='tiny-url' className='short_url' onClick={redirectToLongURL}>
          {shortURL}
        </div>

        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id='tooltip-right'>
              {urlCopied ? 'Copied!' : 'Copy to clipboard.'}
            </Tooltip>
          }
        >
          <i onClick={copyURL} data-testid='copy' className="fa-solid fa-copy"></i>
        </OverlayTrigger>
      </div>
      }

      <span>You want to save it? <i onClick={showSave} data-testid='save' className="fa-solid fa-chevron-down"></i></span>

      {save && 
      <div>
      <input
        placeholder='Add a title...'
        type='title'
        name='title'
        ref={title}
      />&nbsp;
      <button type='submit' data-testid='save-btn' onClick={saveToDatabase}>Save</button>
      </div>}
    </div>
  );
}
 
export default ShortenURLs;
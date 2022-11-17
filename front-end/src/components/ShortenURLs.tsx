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

  const [shortURL, setShortURL] = useState<any>('');
  const [longURL, setLongURL] = useState<string>('');
  const [saveLongURL, setSaveLongURL] = useState<string>('');
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  
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
    setSaveLongURL(longURL);
    setLongURL('');
  };


  //Redirect from short URL to long URL:
  const redirectToLongURL = () => {
    window.open(longURL);
  };


  //Save generated URL to database:
  const saveToDatabase = () => {
    return axios.post(`/dashboard/${user_id}`, {
      long_url: longURL,
      short_url: shortURL,
      title: title.current.value
    })
      .then((res) => {
        console.log('Data saved', res.data);
        props.fetch();
        setShortURL('');
        title.current.value = '';
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
          value={longURL}
          onChange = {(event) => {
            setLongURL(event.target.value)}
          }
        />&nbsp;
      <button className='shorten_btn' data-testid='shorten' type='submit' onClick={shortenURL}>Shorten</button>
      </div>
      {shortURL &&
      <div className='tiny_url_div'>
        <span data-testid='tiny-url' className='short_url' onClick={redirectToLongURL}>
          {/* {shortURL} */}

          <OverlayTrigger
            key='bottom'
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-bottom'>
                Click to open: {saveLongURL}.
              </Tooltip>
            }
          >
            <span>{shortURL}</span>
          </OverlayTrigger>

        </span>

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
      <br />
      <p>You want to save it? <i onClick={showSave} data-testid='save' className="fa-solid fa-chevron-down"></i></p>

      <div className='save_div'>
      <input
        placeholder='Add a title'
        type='title'
        name='title'
        ref={title}
      />&nbsp;
      <button type='submit' data-testid='save-btn' onClick={saveToDatabase}>Save</button>
      </div>
    </div>
  );
}
 
export default ShortenURLs;
import React, { useRef, useState } from 'react';

import axios from 'axios';

import { useCookies } from 'react-cookie';

import { generateRandomShortURL } from '../helpers/helpers.js';

import './ShortenURLs.scss';

interface ShortenURLsProps {
  fetch: () => void;
};

const ShortenURLs = (props: ShortenURLsProps) => {
  const [cookies, setCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const user_id = cookies.user_id;

  const [shortURL, setShortURL] = useState<any>(null);

  const longURLInput = useRef<any>(null);
  const title = useRef<any>(null);

  const shortenURL = () => {    
    const generatedShortURL: string = generateRandomShortURL();

    setShortURL(generatedShortURL);
  };

  const redirectToLongURL = () => {
    const longURL = longURLInput.current.value;

    window.open(longURL);
  };

  const saveToDatabase = () => {
    axios.post(`/dashboard/${user_id}`, {
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
          type='longurl'
          name='longurl'
          ref={longURLInput}
        />&nbsp;
      <button type='submit' onClick={shortenURL}>Shorten</button>
      </div>
      <div className='short_url' onClick={redirectToLongURL}>
        {shortURL}
      </div>

      <input
        placeholder='Add a title...'
        type='title'
        name='title'
        ref={title}
      />&nbsp;
      <button type='submit' onClick={saveToDatabase}>Save</button>
    </div>
  );
}
 
export default ShortenURLs;
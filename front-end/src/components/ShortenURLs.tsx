import React, { useRef, useState } from 'react';

import { generateRandomShortURL } from '../helpers/helpers.js';

import './ShortenURLs.scss';


const ShortenURLs = () => {
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
  }

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
      <button type='submit'>Save</button>
    </div>
  );
}
 
export default ShortenURLs;
import React, { useRef, useState } from 'react';

import './ShortenURLs.scss';


const ShortenURLs = () => {
  const [shortURL, setShortURL] = useState<any>(null);
  
  const longURL = useRef<any>(null);
  const title = useRef<any>(null);

  return (
    <div className='shorten_url'>
      <div className='long_url_input'>
        <input 
          type='longurl'
          name='longurl'
          ref={longURL}
        />&nbsp;
      <button type='submit'>Shorten</button>
      </div>
      <div className='short_url'>
        <input 
          defaultValue={shortURL}
          disabled
        />
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
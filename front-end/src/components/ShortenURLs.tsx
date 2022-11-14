import React, { useRef, useState } from 'react';

const ShortenURLs = () => {
  const [shortURL, setShortURL] = useState<any>(null);
  const longURL = useRef<any>(null);
  const title = useRef<any>(null);

  return (
    <div>
      <input 
        type='longurl'
        name='longurl'
        ref={longURL}
      />
      <button type='submit'>Shorten</button>
      <div className='short_url'>
        <input 
          defaultValue={shortURL}
          disabled
        />
      </div>

      <span>Title:</span>
      <input 
        type='title'
        name='title'
        ref={title}
      />
      <button type='submit'>Save</button>
    </div>
  );
}
 
export default ShortenURLs;
import React, { useEffect, useState } from 'react';

import axios from 'axios';

interface CountVisitsProps {
  url_id: number | string;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  incrementCount: number;
}

const CountVisits = (props: CountVisitsProps) => {

  const getVisitsNumber = () => {
    axios.get(`/visits/${props.url_id}`)
      .then((res) => {
        console.log('visits', res.data);
        props.setCounter(res.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      })
  };

  useEffect(() => {
    getVisitsNumber();
  }, [props.incrementCount]);

  return (
    <div>
      {props.counter}
    </div>
  );
}
 
export default CountVisits;
import React, { useEffect, useState } from 'react';

import moment from "moment";

import axios from 'axios';

import './CountVisits.scss';

interface CountVisitsProps {
  url_id: number | string;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  incrementCount: number;
}

const CountVisits = (props: CountVisitsProps) => {
  const [lastVisit, setLastVisit] = useState<any>('No visits yet.');
  
  const getVisitsNumber = () => {
    axios.get(`/visits/${props.url_id}`)
      .then((res) => {
        props.setCounter(res.data.length);
        if (res.data[res.data.length - 1].date_visited) {
          setLastVisit(moment(res.data[res.data.length - 1].date_visited).format('MMMM Do YYYY, h:mm:ss a'));
        }
      })
  };

  useEffect(() => {
    getVisitsNumber();
  }, [props.incrementCount]);


  return (
    <div className='trafic'>

      <i className="fa-solid fa-circle-info"></i> <span id='title'>Traffic</span> <br />
      <span className='tiny_title'>Number of visits:</span> {props.counter}
      <br />
      <span className='tiny_title'>Last visit:</span> {lastVisit && lastVisit}

    </div>
  );
}
 
export default CountVisits;
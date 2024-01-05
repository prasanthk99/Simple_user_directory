import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CountUpTimer = ({CountrySelected}) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  
  async function SelectedCountry(){
    console.log(CountrySelected);
    await axios.get(`https://worldtimeapi.org/api/timezone/${CountrySelected}`)
    .then(function (response) {
        const Timestamp = response.data.utc_datetime;
        const date = new Date(Timestamp);

        // Get the various components of the date
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        let ConvertToSec = toSeconds(hours,minutes,seconds);
        setTimer(ConvertToSec);
        // console.log(time);
        // console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
        setIsRunning(true);
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  useEffect(()=>{
    SelectedCountry();
  },[CountrySelected]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function toSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h3 style={{backgroundColor:'black',color:'white',margin:'auto 4px',padding:'4px'}}>{formatTime(timer)}</h3>
      <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
    </div>
  );
};

export default CountUpTimer;
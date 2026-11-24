import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  const handleBack = () => {
    stop();
    navigate(location.state.previousPage, {
      state: { elapsedTime: formatTime(time) },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stopwatch</h2>
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        {formatTime(time)}
      </div>
      <div>
        <button onClick={start} style={{ marginRight: "10px" }}>
          Start
        </button>
        <button onClick={stop} style={{ marginRight: "10px" }}>
          Stop
        </button>
        <button onClick={reset} style={{ marginRight: "10px" }}>
          Reset
        </button>
        <button onClick={handleBack}>بازگشت به کار</button>
      </div>
    </div>
  );
};

export default StopWatch;

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div style={{ textAlign: "center" }}> 
      <h1>Timer</h1>
      <h2>{seconds} sec</h2>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setSeconds(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
import React, { useState, useEffect, useRef } from "react";

export const Timer = (props) => {
  const [timer, setTimer] = useState(null);
  const [minTimer, setMinTimer] = useState(null);

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    setMinTimer(props.time);
  }, [props.time]);

  // useEffect(() => {
  //   if (props.isStart) handleCountdownTimer();
  // }, [props.isStart]);

  useEffect(() => {
    handleSetInterval();
    return () => clear();
  }, []);

  const handleSetInterval = () => {
    id.current = window.setInterval(() => {
      setTimer((time) => {
        const tValue = time - 1;

        if (time > 10) {
          return tValue;
        } else {
          return "0" + tValue;
        }
      });
    }, 1000);
  };

  const handleCountdownTimer = () => {
    if (Number(timer) === 0) {
      clear();
      if (Number(minTimer) > 0) {
        let minutes = Number(minTimer) - 1;
        setMinTimer(minutes);
        setTimer(60);
        handleSetInterval();
      }

      if (minTimer === 0 && timer === 0) {
        props.handleTimesUp();
      }
    }
  };

  useEffect(() => {
    if (Number(timer) === 0) {
      clear();
      if (Number(minTimer) > 0) {
        let minutes = Number(minTimer) - 1;
        setMinTimer(minutes);
        setTimer(60);
        handleSetInterval();
      }
    }
  }, [timer, minTimer]);

  const handleTimesUpProp = () => {
    if (minTimer === 0 && timer === 0) props.handleTimesUp();
  };

  return (
    <div>
      Time left : {minTimer < 10 ? "0" + minTimer : minTimer} :{" "}
      {timer === 60 ? "00" : timer}{" "}
    </div>
  );
};

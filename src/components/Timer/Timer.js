import React, { useState, useEffect, useRef, useCallback } from "react";

export const Timer = (props) => {
  const [timer, setTimer] = useState(0);
  const [minTimer, setMinTimer] = useState(0);

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    setMinTimer(props.time);

    return () => {
          clear();
        }

  }, [props.time]);


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


  const handleTimesUpProp =
    useCallback(
      () => {
        if (minTimer === 0 && parseInt(timer) === 0 && props.isStart) {
          props.handleTimesUp();
        }
      }
      , [minTimer, timer, props]);

  useEffect(() => {
    if (props.isStart) {

      if (Number(timer) === 0) {
        if (Number(minTimer) > 0) {
          let minutes = Number(minTimer) - 1;
          clear();
          setMinTimer(minutes);
          setTimer(59);
          handleSetInterval();
        }
      }
      handleTimesUpProp();

    }

  }, [timer, minTimer, props.isStart, handleTimesUpProp]);



  return (
    <div>
      Time left : {minTimer < 10 ? "0" + minTimer : minTimer} :{" "}
      {timer === 60 || timer === 0 ? "00" : timer}{" "}
    </div>
  );
};

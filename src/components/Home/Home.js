import React, { useState } from "react";
import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";
import "./Home.css";
import Typer from "../../containers/Typer";
import { Button } from "../Button/Button";
import { withRouter } from "react-router-dom";

const Home = () => {
  const ONE_MINUTE_BUTTON = "oneMinute";
  const TWO_MINUTE_BUTTON = "twoMinute";
  const THREE_MINUTE_BUTTON = "threeMinute";

  const [time, setTimer] = useState(1);

  const [activeMinuteButtons, setActiveMinuteButtons] = useState({
    oneMinuteButton: true,
    twoMinuteButton: false,
    threeMinuteButton: false,
  });

  const histoy = useHistory();

  const handleClick = () => {
    return histoy.push("/typer/" + time);
  };

  const handleMinuteButtons = (e) => {
    const activeButtons = {
      oneMinuteButton: true,
      twoMinuteButton: true,
      threeMinuteButton: true,
    };

    let time = 1;

    if (e.target.name === ONE_MINUTE_BUTTON) {
      activeButtons.oneMinuteButton = true;
      activeButtons.twoMinuteButton = false;
      activeButtons.threeMinuteButton = false;

      time = 1;
    } else if (e.target.name === TWO_MINUTE_BUTTON) {
      activeButtons.oneMinuteButton = false;
      activeButtons.twoMinuteButton = true;
      activeButtons.threeMinuteButton = false;

      time = 2;
    } else if (e.target.name === THREE_MINUTE_BUTTON) {
      activeButtons.oneMinuteButton = false;
      activeButtons.twoMinuteButton = false;
      activeButtons.threeMinuteButton = true;

      time = 3;
    }

    setActiveMinuteButtons(activeButtons);
    setTimer(time);
  };

  return (
    <div className="main-container">
      <p className="header-text">Welcome to precise typer</p>
      <div className="container">
        <div className="sub-container">

          <div className="buttonContainer">
            <Button
              name={ONE_MINUTE_BUTTON}
              isActive={activeMinuteButtons.oneMinuteButton}
              handleMinutes={handleMinuteButtons}
            >
              1 minute
        </Button>
            <Button
              name={TWO_MINUTE_BUTTON}
              isActive={activeMinuteButtons.twoMinuteButton}
              handleMinutes={handleMinuteButtons}
            >
              2 minute
        </Button>
            <Button
              name={THREE_MINUTE_BUTTON}
              isActive={activeMinuteButtons.threeMinuteButton}
              handleMinutes={handleMinuteButtons}
            >
              3 minute
        </Button>
          </div>
          <button className="startButton" onClick={handleClick}>
              <span className="front">
              START NOW
              </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
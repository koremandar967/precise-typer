import React, { useState } from "react";

export const Button = (props) => {
  return (
    <button
      className={props.isActive ? "ActiveButtonInput" : "buttonInput"}
      onClick={props.handleMinutes}
      name={props.name}
    >
      {props.children}
    </button>
  );
};

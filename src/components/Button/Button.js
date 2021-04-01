import React, { useState } from "react";

// temp 2
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

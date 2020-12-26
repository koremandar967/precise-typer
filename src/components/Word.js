import React from "react";
import "./Word.css";
const word = (props) => {
  return (
    <div
      className={
        "word-container " +
        (props.isError ? "word-text-error" : "word-text-normal")
      }
    >
      <p
        className={"word-text " + (props.isError ? "word-text-animation" : "")}
      >
        {props.currentWord}
      </p>
    </div>
  );
};

export default word;

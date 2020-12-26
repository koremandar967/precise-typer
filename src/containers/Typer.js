import React, { Component } from "react";
// import axios from "axios";
import axios from "../axiosInstance";
import "./Typer.css";
import Word from "../components/Word";
import { Timer } from "../components/Timer/Timer";

class Typer extends Component {
  state = {
    words: [],
    currentWord: "loading...",
    wordInputValue: "",
    wordIndex: 0,
    isError: false,
    loading: true,
    time: 10,
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    console.log(params);
    this.setState({ time: params.time });
    axios.get("?number=160").then((response) => {
      this.setState({
        words: response.data,
        currentWord: response.data[0],
        loading: false,
      });
    });
  }

  handleChange = (e) => {
    this.setState({ wordInputValue: e.target.value });
    // console.log(e.target.value);
    this.setError(e.target.value);
    this.setNextWord(e.target.value);
  };

  timesUpHandler = () => {
    console.log("Times Up");
  };

  setError(inputValue) {
    if (inputValue.length > this.state.currentWord.length) {
      this.setState({ isError: true });
    } else {
      const word = this.state.currentWord;
      const splicedWord = word.toString().substring(0, inputValue.length);

      if (inputValue.toString() === splicedWord.toString()) {
        this.setState({ isError: false });
      } else {
        this.setState({ isError: true });
      }
    }
  }

  setNextWord(inputValue) {
    if (this.matchWord(inputValue)) {
      let currentIndex = this.state.wordIndex;
      const nextIndex = ++currentIndex;
      if (this.state.words.length > nextIndex)
        this.setState({
          currentWord: this.state.words[nextIndex],
          wordIndex: nextIndex,
        });
    }
  }

  matchWord(inputValue) {
    if (inputValue !== this.state.currentWord) {
      return false;
    } else {
      this.setState({ wordInputValue: "" });
      return true;
    }
  }

  render() {
    return (
      <div className="typerContainer">
        <Word
          currentWord={this.state.currentWord}
          isError={this.state.isError}
        />
        <Timer
          time={this.props.match.params.time}
          isStart={true}
          handleTimesUp={this.timesUpHandler}
        />
        <div className="form-container">
          <input
            name="text"
            className="word-input"
            placeholder="Start typing word"
            value={this.state.wordInputValue}
            onChange={this.handleChange}
          ></input>
        </div>
      </div>
    );
  }
}

export default Typer;

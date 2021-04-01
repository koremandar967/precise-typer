import React, { Component } from "react";
// import axios from "axios";
import axios from "../axiosInstance";
import "./Typer.css";
import Word from "../components/Word";
import { Timer } from "../components/Timer/Timer";
import Spinner from "../components/Spinner/Spinner";
import Result from '../components/Result/Result';

class Typer extends Component {

  state = {
    words: [],
    currentWord: "loading...",
    correctCharacterCount: 0,
    wordInputValue: "",
    wordIndex: 0,
    isError: false,
    loading: true,
    time: 10,
    isTimesUp: false,
    correctWordCount: 0,
    shouldTimerStart : false,
    wpmSpeed : 0,
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log(this.props);
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
    
    this.setState({ wordInputValue: e.target.value, shouldTimerStart : true});
    // console.log(e.target.value);
    this.setError(e.target.value);
    this.setNextWord(e.target.value);
  };

  timesUpHandler = () => {
  
    this.showResults();
    this.setState({isTimesUp: true});

  };

  showResults = () => {

    const correctWordCount = this.state.correctWordCount;
    if(this.state.time) {
      let calculatedWpmSpeed = ((this.state.correctCharacterCount / 5) / this.state.time).toFixed();
      this.setState({wpmSpeed : calculatedWpmSpeed})

    }


  }

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
      const currentCharacterCount = this.state.correctCharacterCount;
      const totalCharacterCount = currentCharacterCount + this.state.currentWord.length;

      const wordCount = this.state.correctWordCount + 1;
      const temp = 23.6;
      console.log(Math.floor(temp));
      this.setState({ wordInputValue: "",correctWordCount: wordCount,correctCharacterCount : totalCharacterCount});
      return true;
    }
  }


  render() {


    return (

      this.state.loading ? <Spinner/> :

      this.state.isTimesUp ?   
      <Result wpmSpeed = {this.state.wpmSpeed} />:

      <div className="typerContainer">
        <Word
          currentWord={this.state.currentWord}
          isError={this.state.isError}
        />
        <Timer
          time={this.props.match.params.time}
          isStart={this.state.shouldTimerStart}
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

import axios from "axios";

const instance = axios.create({
  baseURL: "https://random-word-api.herokuapp.com/word",
});

export default instance;

import React from "react";
import "./App.css";
import Typer from "./containers/Typer";
import { Link, Route, Switch } from "react-router-dom";
import  Home  from "./components/Home/Home";
import Result from "./components/Result/Result";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/typer" component={Typer} />
        <Route exact path="/typer/:time" component={Typer} />
      </Switch>
      {/* <Typer /> */}
    </div>
  );
}

export default App;

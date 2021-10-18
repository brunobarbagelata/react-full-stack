import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import OneTask from "./components/OneTask";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/oneexample/:exampleId" component={OneTask} />
      </Switch>
    </div>
  );
}

export default App;

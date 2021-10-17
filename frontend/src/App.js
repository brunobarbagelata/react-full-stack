import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;

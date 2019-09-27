import React, { Component } from "react";
import "./App.css";
import Quiz from "./Admin/Quiz";
import DashBoard from "./Admin/dashBoard";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <br></br>
        <Quiz></Quiz>
        <DashBoard/>
      </React.Fragment>
    );
  }
}

export default App;

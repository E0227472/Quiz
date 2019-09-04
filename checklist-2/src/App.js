import React, { Component } from "react";
import "./App.css";
import FormLoader from "./User/formload";
import Quiz from "./Admin/Quiz";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <FormLoader />
        <br></br>
        <Quiz></Quiz>
      </React.Fragment>
    );
  }
}

export default App;

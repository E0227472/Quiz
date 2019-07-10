import React, { Component } from 'react';
import "./App.css";
import QuizForm from "../src/Admin/QuizForm";

class App extends Component {
  handleSubmitHandler = values => {
    console.log(values);
  };
  render() { 
    return (  
      <React.Fragment>
        <QuizForm onSubmit={this.handleSubmitHandler} />
      </React.Fragment>
    );
  }
}
 
export default App;

import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";
import Question from "./questionComponent";
import QuestionButton from "../common/questionButton/questionButton";

class createCheckList extends Form {
  state = {
    data: { quiz: "" },
    errors: {},
    questionArray: []
  };

  schema = {
    quiz: Joi.string().required()
  };
  // this event handler pushes a Question Component to an array each time button clicked.
  // all the component array elements are then displayed
  questionButtonHandler = () => {
    let questionCopyArray = [...this.state.questionArray];
    questionCopyArray.push(<Question />);
    this.setState({ questionArray: questionCopyArray });
    console.log(this.props.form);
  };
  render() {
    const { questionArray } = this.state;
    // the question component is being rendered when the question button is clicked
    return (
      <div className="container">
        <form>
          <Card>{this.renderInput("quiz", "fa fa-pencil", "Quiz")}</Card>
          {questionArray}
          <br />
          <QuestionButton onButtonclick={this.questionButtonHandler} />
        </form>
      </div>
    );
  }
}

export default createCheckList;

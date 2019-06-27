import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";
import Option from "./optionsComponent";
import Button from "../common/button/button";

class QuestionComponent extends Form {
  state = {
    data: { question: "" },
    errors: {},
    optionComponentArray: []
  };

  schema = {
    question: Joi.string().required()
  };

  onAddOption = () => {
    let optionComponentCopyArray = [...this.state.optionComponentArray];
    optionComponentCopyArray.push(<Option />);
    this.setState({ optionComponentArray: optionComponentCopyArray  });
  };

  // when iterating the opinionComponentArray, iterate each component, beside the component, render a
  // button that accepts index of the component.
  // Delete the array based on the index of the component.
  render() {
    const {optionComponentArray} = this.state;
    return (
      <Card>
        {this.renderInput("question", "fa fa-quora", "Question")}
        {optionComponentArray}
        <Button onClick = {this.onAddOption}/>
      </Card>
    );
  }
}

export default QuestionComponent;

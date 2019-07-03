import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";
import Option from "./optionsComponent";
import Button from "../common/button/button";

class QuestionComponent extends Form {
  state = {
    // 1 component will have one question and an array of options.
    data: { question: "", options: [{ option: "" }] },

    errors: {},
    optionComponentArray: []
  };

  schema = {
    question: Joi.string().required()
  };



  onAddOption = () => {
    const copyData = this.state.data;
    let copyOptions = copyData.options;
    copyOptions.push({option: ""});
    this.setState({data: {options: copyOptions}});
  };

  handleOptionChange = idx => evt => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(evt.currentTarget);
    // if (errorMessage) errors[evt.currentTarget.name] = errorMessage;
    // else delete errors[evt.currentTarget.name]; // delete keyword removes the property and its value
    // const data = { ...this.state.data }; // get a copy of the data object from state
    // data[e.currentTarget.name] = e.currentTarget.value; // get the username that has been typed in textbox
    // this.setState({ data, errors }); // set the state to the new value
    // console.log(e.currentTarget.value);

    const copyData = this.state.data;
    
    const newOptions = copyData.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return { ...option, option : evt.currentTarget.value };
    });
    this.setState({ data: {options: newOptions} });
  };

  // when iterating the opinionComponentArray, iterate each component, beside the component, render a
  // button that accepts index of the component.
  // Delete the array based on the index of the component.
  render() {
    const { options } = this.state.data;
    return (
      <Card>
        {this.renderInput("question", "fa fa-quora", "Question")}
        {options.map((option, idx) => (
          <div className={option}>
            {this.renderOptionsInput("option", "fa fa-telegram", "Option",  this.handleOptionChange(idx))}
          </div>
        ))}
        <Button onClick={this.onAddOption} />
      </Card>
    );
  }
}

export default QuestionComponent;

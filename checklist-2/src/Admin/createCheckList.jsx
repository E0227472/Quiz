import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";

class createCheckList extends Form {
  state = {
    data: { quiz: "", question: "", options: "" },
    errors: {}
  };

  schema = {
    quiz: Joi.string().required(),
    question: Joi.string().required(),
    options: Joi.string().required()
  };


  render() {
    return (
      <div className="container">
        <form>
          <Card>{this.renderInput("quiz", "fa fa-pencil", "Quiz")}</Card>

          <Card>
            {this.renderInput("question", "fa fa-quora", "Question")}
            {this.renderOptionsInput("options", "fa fa-telegram", "Options")}
          </Card>
        </form>
      </div>
    );
  }
}

export default createCheckList;

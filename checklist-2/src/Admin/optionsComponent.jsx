import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";

class Options extends Form {
  state = {
    data: { option: "" },
    errors: {}
  };
  schema = {
    option: Joi.string().required()
  };
  render() {
    return (
      <React.Fragment>
        {this.renderOptionsInput("option", "fa fa-telegram", "Option")}
      </React.Fragment>
    );
  }
}

export default Options;

import React, { Component } from "react";
import Card from "../common/card/card";
import Joi from "joi-browser";
import Form from "../common/form";

class Options extends Form {
  state = {
    data: [{ option: "" }],
    errors: {}
  };

  componentDidMount () {
    console.log(this.props.index);
  };

  schema = {
    option: Joi.string().required()
  };


  render() {
    const index = this.props.index;
    return (
      <React.Fragment>
        {this.renderOptionsInput("option", "fa fa-telegram", "Option", index)}
      </React.Fragment>
    );
  }
}

export default Options;

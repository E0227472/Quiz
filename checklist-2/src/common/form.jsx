import React, { Component } from "react";
import Input from "./input/input";
import OptionsInput from "./optionsInput/optionsInput";
class Form extends Component {
  state = {
    data: {},
    errors: {},
    optionArraySize: 1
  };

  // method validates only one property on change.
  // When text entered and deleted, the error message pops up.
  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value }; // obj should contain only one property that is being validated
  //   const schema = { [name]: this.schema[name] }; // schema should only have one property that is being validated
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? "Please enter a valid input" : null;
  // };

  // // this method validates the entire form
  // validate = () => {
  //   // mapping data to schema object where the properties are matched
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(this.state.data, this.schema, options);
  //   console.log(error);
  //   if (!error) return null;

  //   const errors = { ...this.state.errors };
  //   for (let item of error.details) // iterate over the details array
  //     errors[item.path[0]] = item.message;

  //   return errors;
  // };
  // when form submitted, method checks for errors before form submission
  handleSubmit = e => {
    e.preventDefault(); // => preventDefault() prevents the default behaviour in this case the loading of the page
    const errors = this.validate(); // => getting the errors from validate method, which returns errors
    this.setState({ errors: errors || {} });
    if (errors) return; // => if the errors present, do not call the server, otherwise call server.
    // return keyword is used to exit from method.

    this.doSubmit();
  };
  // when user enters input, input captured in state.
  handleChange = e => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(e.currentTarget);
    // if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    // else delete errors[e.currentTarget.name]; // delete keyword removes the property and its value
    const data = { ...this.state.data }; // get a copy of the data object from state
    data[e.currentTarget.name] = e.currentTarget.value; // get the username that has been typed in textbox
    this.setState({ data }); // set the state to the new value
    console.log(e.currentTarget.value);
  };

  

  // method returns button jsx syntax
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  // method returns input field
  renderInput(name, iconClassName, placeholder, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        iconClassName={iconClassName}
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  // method returns input field
  renderOptionsInput(name, iconClassName, placeholder, handleOptionChange, type = "text") {
    const { data, errors } = this.state;
    return (
      <OptionsInput
        iconClassName={iconClassName}
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name]}
        onChange={handleOptionChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

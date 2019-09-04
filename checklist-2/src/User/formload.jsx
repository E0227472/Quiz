import React, { Component } from 'react';
import Button from "../common/button/button";
import http from "../services/httpService";
import config from "../../src/config.json";
import { connect } from "react-redux";
import * as actionTypes from "../store/action";




class FormLoader extends Component {
  // method gets data from the back-end 
  getFormData = async() => {
    try {
      // receive a promise and then instantiate data to result from back-end 
     const {data: result} = await http.get(config.apiEndPoint + "/quiz/id/1");

     console.log(JSON.stringify(result));
      // remove the id property from both question object and the option object. 
     for(let obj of result.questions) {
       delete obj['id'];
        for(let objOptions of obj['options']) {
          delete objOptions['id'];
        }
     };
    
     console.log("clicked get form data");
     delete result['id'];
     this.props.onStoreResult(result);
     
    } catch (ex) {
   alert("Failed to get object or object getting error");
    }
  };

  getReduxState = () => {
    console.log("clicked get redux state");
    console.log(this.props.quiz);
  }
    render() { 
        return (
          <React.Fragment>
          <Button
            onClick={() => this.getFormData()}
            label="Load Form Data"
            type="button"
            disabled=""
          />
    <br/>
          <Button
            onClick={() => this.getReduxState()}
            label="Get Redux state"
            type="button"
            disabled=""
          />
          </React.Fragment>
        );
    }
}


// getting the state from the global state store object and not internal state.
// injected into current component. Hence, referred to as props when used in the component
const mapStateToProps = state => {
  return {
    // mapping the properties in the global state to the internal properties to component
    // Redux allows one level of nesting 
    quiz: state.quizForm.quiz
  };
};

// similar to setState in internal component, to change the state
// the dispatch method is to specify the action name
const mapDispatchToProps = dispatch => {
  return {
    onStoreResult: (result) => dispatch({ type: actionTypes.SAVE_FORM_DATA, quiz: result})
  };
};
 
// connect => subscription method that is obtained from react-redux.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLoader);

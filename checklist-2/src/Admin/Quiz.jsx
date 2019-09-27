import React, { Component } from 'react';
import QuizForm from "../Admin/QuizForm";
import http from "../services/httpService";
import config from "../../src/config.json";
import { connect } from "react-redux";

// Higher ORder Components
class Quiz extends Component {


    handleSubmitHandler = async values => {
        const httpPost = config.apiEndPoint + "api/quiz";
       const result = await http.post(httpPost, values);
        console.log(JSON.stringify(values));
        console.log(result);
        
    };

    render() { 
        return (
            <React.Fragment>
                <QuizForm 
                onSubmit={this.handleSubmitHandler}/>
            </React.Fragment>
          );
    }
}


export default Quiz

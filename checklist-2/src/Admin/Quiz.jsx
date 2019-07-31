import React, { Component } from 'react';
import QuizForm from "../Admin/QuizForm";

// Higher ORder Components
class Quiz extends Component {
   
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
 
export default Quiz;
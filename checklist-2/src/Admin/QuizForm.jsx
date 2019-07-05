import React from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import styles from "./QuizForm.module.css";
import Card from "../common/card/card";
import Button from "../common/button/button";


// functional component for general input fields
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className = {styles.alignCentre}>
   
        <div className = {styles.inputField}>
            <input 
            {...input} 
            type={type} 
            placeholder={label} 
            className = "form-control"/>
            {touched && error && <span>{error}</span>}
        </div>
  </div >
);

// functional component to render the options 
const renderOptions = ({ fields, meta: { error } }) => (
    <ul>
        <div className={styles.alignCentre}>
            <div className={styles.inputField}>
            <Button onClick={() => fields.push()} label = "Add Option" styles = {styles.AddOption}/>
            </div>
        </div>
        {fields.map((option, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Option"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={option}
                    type="text"
                    component={renderField}
                    label={`Option ${index + 1}`}
                    placeholder = "Option"
                />
            </li>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

// functional component to render questions and the options 
const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    
    <ul>
        <div className = {styles.alignCentre}>
        <div className = {styles.inputField}>
                <Button onClick={() => fields.push()} label="Add Question" styles={styles.AddQuestion}/>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
        </div>
        {/** The question component is conditionally rendered when the field array has length != 0 */}
        {fields.length != 0 ?
       ( <Card>
        {fields.map((question, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Question"
                    onClick={() => fields.remove(index)}
                />
                <h4>Question #{index + 1}</h4>

                <Field
                    name = {question}
                    type="text"
                    component={renderField}
                    label= {`Question ${index+1}`}
                />

                <FieldArray name={`${question}.options`} component={renderOptions} />
            </li>
        ))}
</Card>) : null
        }
    </ul>
);

const QuizForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Card>
            <Field
                name="quiz"
                type="text"
                component={renderField}
                label = "Quiz"
            />
            </Card>
            <FieldArray name="questions" component={renderQuestions} />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
        </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'quizForm', // a unique identifier for this form
    //validate,
})(QuizForm);


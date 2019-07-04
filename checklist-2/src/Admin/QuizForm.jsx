import React from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';


// functional component for field input 
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

// functional component to render the options 
const renderOptions = ({ fields, meta: { error } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>Add Option</button>
        </li>
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

// functional component to render questions
const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>Add question</button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
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
    </ul>
);

const QuizForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="quiz"
                type="text"
                component={renderField}
                label="Quiz"
            />
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


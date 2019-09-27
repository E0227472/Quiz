import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import "../stylingComponent/styles.scss";
import Button from "../common/button/button";
import RemoveButton from "../common/button/removebutton";
import Card from "../common/card/card";
import { connect } from 'react-redux'



// functional component for general input fields
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className = "alignCentre">
    <div className="inputField">
      <input
        {...input}
        type={type}
        placeholder={label}
        className="form-control"
      />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

// functional component to render the options
const renderOptions = ({ fields, meta: { error } }) => (
  <ul>
    <div className= "alignCentre">
      <div className= "inputField">
        <Button
          onClick={() => fields.push()}
          label="Add Option"
          styles= "AddOption"
          type="button"
          disabled=""
        />
      </div>
    </div>
    {fields.map((option, index) => (
      <div key={index}>
        <div className= "alignButtonRight">
          <RemoveButton
            iconName="fa fa-trash"
            onClick={() => fields.remove(index)}
            styling= "smallerIconOption"
          />
        </div>
        <Field
          name={`${option}.name`}
          type="text"
          component={renderField}
          label={`Option ${index + 1}`}
          placeholder="Option"
        />
      </div>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

// functional component to render questions and the options
const renderQuestions = ({fields, meta: { touched, error, submitFailed }}) => (
  <ul>
        {fields.map((question, index) => 
          <Card>
            <div key={index}>
              <div className= "alignButtonRight">
                <RemoveButton
                  iconName="fa fa-trash"
                  onClick={() => fields.remove(index)}
                  styling= "enlargeIconQuestion"
                />
              </div>

              <h4 className= "alignQuestionLabel">
                Question {index + 1}
              </h4>

              <Field
                name= {`${question}.name`}
                type="text"
                component={renderField}
                label={`Question ${index + 1}`}
                placeholder= "Question"
              />

                <FieldArray
                  name={`${question}.options`}
                  component={renderOptions}
                />
            </div>
          </Card>
        )}
    <div className= "alignCentre">
      <div className= "inputField">
        <Button
          onClick={() => fields.push({})}
          label="Add Question"
          styles= "AddQuestion"
          type="button"
          disabled={false}
        />
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    </div>
  </ul>
);
// QuizForm component => stateless 
let QuizForm = props => {
  const { handleSubmit, pristine, reset, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Field name="name" type="text" component={renderField} label="Quiz" />
      </Card>
      <FieldArray name="questions" component={renderQuestions} />

      <div className= "alignCentre">
        <Button
          label="Cancel"
          styles= "cancelButton"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        />
        <Button
          label="Submit"
          styles= "submitButton"
          type="submit"
          disabled={submitting}
        />
      </div>
    </form>
  );
};


// get the quiz object from the redux store => obtained from the back-end
const mapStateToProps = state => {
  return {
    // the initialValues key automatically maps the values to the form
    initialValues: {
      quiz: state.quizForm.quiz.quiz,
      questions: state.quizForm.quiz.questions
    }
  };
};

export default connect(mapStateToProps)(
  reduxForm({ 
    form: 'quizForm', 
    enableReinitialize: true //=> set enableReinitialize to true each time state changes
  })(QuizForm))
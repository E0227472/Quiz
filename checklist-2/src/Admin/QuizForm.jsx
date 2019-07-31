import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import styles from "./QuizForm.module.css";
import Card from "../common/card/card";
import Button from "../common/button/button";
import RemoveButton from "../common/button/removebutton";

// functional component for general input fields
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles.alignCentre}>
    <div className={styles.inputField}>
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
    <div className={styles.alignCentre}>
      <div className={styles.inputField}>
        <Button
          onClick={() => fields.push()}
          label="Add Option"
          styles={styles.AddOption}
          type="button"
          disabled=""
        />
      </div>
    </div>
    {fields.map((option, index) => (
      <div key={index}>
        <div className={styles.alignButtonRight}>
          <RemoveButton
            iconName="fa fa-trash"
            onClick={() => fields.remove(index)}
            styling={styles.smallerIconOption}
          />
        </div>
        <Field
          name={option}
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
              <div className={styles.alignButtonRight}>
                <RemoveButton
                  iconName="fa fa-trash"
                  onClick={() => fields.remove(index)}
                  styling={styles.enlargeIconQuestion}
                />
              </div>

              <h4 className={styles.alignQuestionLabel}>
                Question {index + 1}
              </h4>

              <Field
                name= {`${question}.question`}
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
    <div className={styles.alignCentre}>
      <div className={styles.inputField}>
        <Button
          onClick={() => fields.push({})}
          label="Add Question"
          styles={styles.AddQuestion}
          type="button"
          disabled={false}
        />
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    </div>
  </ul>
);

const QuizForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Field name="quiz" type="text" component={renderField} label="Quiz" />
      </Card>
      <FieldArray name="questions" component={renderQuestions} />

      <div className={styles.alignCentre}>
        <Button
          label="Cancel"
          styles={styles.cancelButton}
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        />
        <Button
          label="Submit"
          styles={styles.submitButton}
          type="submit"
          disabled={submitting}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "quizForm" // data that is exported from the app
  //validate,
})(QuizForm);

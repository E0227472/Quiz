import React from "react";
import styles from "./questionButton.module.css";

const QuestionButton = (props) => {
  const {onButtonclick} = props;
  return (
    <div className="container">
      <button
        type="button"
        className={styles.questionButton + " " + "btn btn-primary"}
        onClick = {onButtonclick}
      >
        + Add Question
      </button>
    </div>
  );
};

export default QuestionButton;

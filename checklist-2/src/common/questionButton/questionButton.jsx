import React from "react";
import styles from "./questionButton.module.css";

const QuestionButton = () => {
  return (
    <div className="container">
      <button
        type="button"
        className={styles.questionButton + " " + "btn btn-primary"}
      >
        + Add Question
      </button>
    </div>
  );
};

export default QuestionButton;

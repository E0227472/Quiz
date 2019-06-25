import React from "react";
import  styles from "./input.module.css";
// input field used for quiz and questions 
const Input = ({ name, iconClassName, error, ...rest }) => {
  return (
    <div className={styles.formGroup}>
      <div className= {styles.image}>
      <i className={iconClassName} aria-hidden="true" />
      </div>
      <input
        {...rest}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

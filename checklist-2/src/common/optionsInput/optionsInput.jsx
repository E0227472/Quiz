import React from "react";
import styles from "./optionsInput.module.css";

const OptionsInput = ({ name, iconClassName, error, ...rest }) => {

  return (
    <div className={styles.formGroup}>
      <div className={styles.image}>
        <i className={iconClassName} aria-hidden="true" />
      </div>
      <div className = {styles.input}>
        <input 
        {...rest} 
        id={name} 
        name={name} 
        className= 'form-control' />
    </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default OptionsInput;

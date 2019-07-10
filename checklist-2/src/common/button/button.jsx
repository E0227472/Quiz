import React from 'react';


const Button = (props) => {
    const{onClick, label, styles, type, disabled} = props;
    return (
      <button 
      type= {type}
      className={styles != null ? styles + " " + "btn btn-light" : "btn btn-light"}
      onClick = {onClick}
      disabled = {disabled}
      >
        {label}
      </button>
    );
}
 
export default Button;
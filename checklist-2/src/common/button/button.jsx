import React from 'react';


const Button = (props) => {
    const{onClick, label, styles} = props;
    return (
      <button 
      type="button" 
        className={styles != null ? styles + " " + "btn btn-light" : "btn btn-light"}
      onClick = {onClick}
      >
        {label}
      </button>
    );
}
 
export default Button;
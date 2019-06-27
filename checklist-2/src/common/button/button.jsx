import React from 'react';


const Button = (props) => {
    const{onClick} = props;
    return (
      <button 
      type="button" 
      className="btn btn-light"
      onClick = {onClick}
      >
        + Option
      </button>
    );
}
 
export default Button;
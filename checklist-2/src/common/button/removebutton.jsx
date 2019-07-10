import React from "react";


const RemoveButton = props => {
  const { onClick, iconName, styling} = props;
  return (
      <div className = {styling}>
    <button
      type="button"
      onClick={onClick}
    >
          
          <i className={iconName}></i>
    </button>
    </div >
  );
};

export default RemoveButton;

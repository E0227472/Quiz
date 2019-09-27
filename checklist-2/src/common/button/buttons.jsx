import React from 'react'
import Button from "./button";


const Buttons = (props) => {
    const{updateEventHandler, deleteEventHandler} = props;
    return (  
    <React.Fragment>
    <Button label = "Update" onClick = {updateEventHandler}/>
    <Button label = "Delete" onClick = {deleteEventHandler}/>
    </React.Fragment>
    );
}
 
export default Buttons;
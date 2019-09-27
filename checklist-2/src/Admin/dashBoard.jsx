import React, { Component } from 'react';
import HttpService from "../services/httpService";
import config from "../config.json";
import Table from "../common/table";

class DashBoard extends Component {
   state = {
       data: []
   }

   getData = async() => {
    try {
        // receive a promise and then instantiate data to result from back-end 
       const {data: result} = await HttpService.get(config.apiEndPoint + "api/quiz");
     // console.log(JSON.stringify(result) + "result");
       this.setState({data: result});
      } catch (ex) {
     alert("Failed to get object or object getting error");
      }
   }

   componentDidMount () {
       this.getData();
   }

   updateEventHandler = (name) => {
       console.log(`${name} update button is clicked`);
   };

   deleteEventHandler = (name) => {
    console.log(`${name} delete button is clicked`);
   };

    render() { 
        return ( 
           <React.Fragment>
               <Table data = {this.state.data}
               updateEventHandler = {this.updateEventHandler}
               deleteEventHandler = {this.deleteEventHandler}
               />
           </React.Fragment>
         );
    }
}
export default DashBoard;
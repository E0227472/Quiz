import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Buttons from "../common/button/buttons";

const DatatablePage = (props) => {
  const{data, updateEventHandler, deleteEventHandler} = props;

  const data2 = {
    columns: [
    {
            label: 'No',
            field: 'no',
            sort: 'asc',
            width: 100
    },
      {
        label: 'Quiz',
        field: 'name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Actions',
        field: 'actions'
      }
    ],
    rows: []
  };

  let count = 0;
  for(let row of data) {
    count += 1;
   row = Object.assign({no: count}, 
    {name:row.name}, 
    {field: <Buttons
      updateEventHandler = {() => updateEventHandler(row.name)}
      deleteEventHandler = {() => deleteEventHandler(row.name)}/>});
   data2['rows'].push(row);
  }

 
  return (
    <React.Fragment>
    <MDBDataTable
      striped
      bordered
      small
      data={data2}
    />
    </React.Fragment>
  );
}

export default DatatablePage;
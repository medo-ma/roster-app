import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css'
// import  {DateTimePicker}  from '@mui/x-date-pickers/DateTimePicker';
// import { TextField } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Button from '@mui/material/Button';



export default function Student({data,row}) {

    /*/ HERE'S THE VALUES HENCE selectedDate an array:
    const dd = (selectedDate)= {mm = `${selectedDate.$D}`}
    FOR DAY: $D
    
    /*/
    // const [data, setData] = useState([data]);
    
    // useEffect(() => {
    //   axios.get('https://001-alpha-three.vercel.app/api/sheets', {
    //     params: {
    //       mo: `AH${row}:AI${row}`,
    //       sh: 'Sheet1'
    //     }
    //   })
    //     .then(response =>{setData(response.data.mo[0]) ;console.log(response.data.mo[0])})
    //     .catch(error => console.error('Error:', error));
    // }, []);
      return (
<div>
      <table border="1">
      <caption>رصيد الإجازات</caption>
        <thead>
          <tr>
            <th>الاعتيادي</th>
            <th>العوارض</th>
            {/* Add more headers if necessary */}
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          {data.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>) }
          </tr> */}
          <tr>
          <td>{data[33]}</td>
          <td>{data[34]}</td>
          </tr>
        </tbody>
      </table>
    </div>
      );
    }
    

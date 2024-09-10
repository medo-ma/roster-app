import Student from './Student';
import React, { useState, memo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Alerto from './Alerto'


function Step1 ({snom, handleSet, BtnF}){
    return(<>    
    <Stack direction='row' spacing={1}>
    <label>Enter your setting-number:</label>
    <input 
        type='text' 
        value={snom} 
        onChange={handleSet} 
    />
    <BtnF />
    </Stack>
    </> )}

function Step2 ({ passwrong,pass,handlePass,BtnG,student }){
    return(<>
    <Stack textAlign='center' direction='column' spacing={5}>
    <div><h2>{student[2]}</h2></div>
    <Stack direction='row' spacing={1}>
    <label>Enter your password:</label>
    <input 
        type='text' 
        value={pass} 
        onChange={handlePass} 
    />
    <BtnG />
    
    </Stack>
    {passwrong === true && <Alerto></Alerto>}
    </Stack>
    </>)}

const Step3 = memo(({Student , row}) => (
    <div>
        <h1>Step 3</h1>
        <br />
        <Student row={row}/>
    </div>
));



export default function Body() {
    //##states##
    const [step, setStep] = useState(1);
    const [snom, setSnom] = useState(undefined);
    const [pass,setPass] = useState(undefined);
    const [passwrong,setPasswrong] = useState(false)
    const [student,setStudent] = useState([]);
    const [row,setRow] = useState(0)
    //##button##
    //submit-button
    const bSubmit = () => setStep(step + 1);
    const BtnF = () => <Button  color='primary' variant="contained" onClick={BtnFC}>submit</Button>;
    const BtnFC = ()=>{bSubmit() ; fetchData()}
    const BtnG = () => <Button  color='primary' variant="contained" onClick={BtnGC}>submit</Button>;
    const BtnGC = ()=>{if(pass === student[1]){
        setPasswrong(false)
        bSubmit();
    }else{
        setPasswrong(true);
    }}    
    //##handlers##
    //handle-setting number
    const handleSet = (e) => {
        setSnom(e.target.value);
        console.log(snom);
    };
    //handle-password
    const handlePass = (e) => {
        setPass(e.target.value);
        console.log(pass)
    };

    const fetchData = () => {
        axios.get('https://001-alpha-three.vercel.app/api/sheets', {
            params: {
              search: `${snom}`,
              columns: 'A,B',
              sheet: 'Sheet1'
            }
          })
          .then(response => {
            setStudent(response.data.matches[0].student);
            setRow(response.data.matches[0].index);
            
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            
          });
      };
    

    return (
        <>
            {step === 1 && <Step1 snom={snom} handleSet={handleSet} BtnF={BtnF} />}
            {step === 2 && <Step2 passwrong={passwrong} pass={pass} handlePass={handlePass} student={student} BtnG={BtnG} />} 
            {step === 3 && <Step3 Student={Student} row={row}/>}
        </>
    );
}

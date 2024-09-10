import StudentPage from './Student.jsx';
import React, { useState, memo } from 'react';

import { Stack,Button, TextField, Box, Typography, Container } from '@mui/material';
import './App.css'
import axios from 'axios';
import Alerto from './Alerto'


function Step1 ({snom, handleSet, BtnF}){
    return(<>
    <Container component="main" maxWidth="xs">
    <Stack  direction='column'
            spacing={1}
            sx={{
                justifyContent: "center",
                }}
  >
    <Typography component="h1" variant="h5">
        Login
    </Typography>
    <Box sx={{ mt: 1 }}>

    <TextField
            sx={{width:'100%'}}
            margin="normal"
            required
            fullWidth
            id="Code"
            label="student code"
            name="student code"
            autoComplete="student code"
            autoFocus
            value={snom}
            onChange={handleSet}
          />
    </Box>
    <Stack  direction="row"
            spacing={1}
            sx={{
            justifyContent: "center",
            alignItems: "center",}}  >


    </Stack>
    <Stack  direction='column'
            spacing={3}
            sx={{
            
            width:'100%',
            justifyContent: "center",
            alignItems: "center",}}  >
    <BtnF />
    
    </Stack>
    </Stack> 
    </Container>
    </> )}

function Step2 ({ passwrong,pass,handlePass,BtnG,student }){
    return(<>
    
    <Container component="main" maxWidth="xs">
    <div className='stuName'><h2 >الاسم: {student[2]} </h2></div>
    <hr></hr>
    <Stack  direction='column'
            spacing={1}  >

    
    <Stack direction='column' spacing={1} sx={{alignItems:"center",justifyContent:'center'}}>
    <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={handlePass}
          />

    
    </Stack>
    <Stack  direction='column'
            spacing={3}
            sx={{
            
            width:'100%',
            justifyContent: "center",
            alignItems: "center",}}  >
    <BtnG />
    {passwrong === true && <Alerto></Alerto>}
    </Stack>
    </Stack>
    </Container>
    </>)}

const Step3 = memo(({student, row}) => (
    <Container component="main" maxWidth="xs">
      
    <Typography component='h1' variant="h6">
    <div className='stuName'><h2 >اسم الطالب المسجل : {student[2]} </h2></div>
    <hr></hr>
    </Typography>
    <StudentPage data={student} row={row}/>
    
    </Container>
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
    const BtnF = () => <button className='btnf'  onClick={BtnFC}>next</button>;
    const BtnFC = ()=>{bSubmit() ; fetchData()}
    const BtnG = () => <button className='btng'   onClick={BtnGC}>submit</button>;
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
        console.log(snom)
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
        <body>
            {step === 1 && <Step1 snom={snom} handleSet={handleSet}  BtnF={BtnF}/>}
            {step === 2 && <Step2 passwrong={passwrong} pass={pass} handlePass={handlePass} student={student} BtnG={BtnG} />} 
            {step === 3 && <Step3 student={student} signIn={BtnGC} row={row}/>}
        </body>
        </>
    );
}

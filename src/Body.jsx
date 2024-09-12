import StudentPage from './Student.jsx';
import React, { useState, memo,useEffect  } from 'react';

import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import './App.css'
import axios from 'axios';
import Alerto from './Alerto'
import AlertoExist from './AlertoExist.jsx'

function Step1 ({snom,rememberMe, handleSet, BtnF,ForsignUp,RememberMeChange}){
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

    <Stack direction='column'
            spacing={3}
            sx={{
            
            width:'100%',
            justifyContent: "center",
            alignItems: "center",}} >

    <BtnF />     
    <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={RememberMeChange} />}
            label="Remember Me"
            
          />
    <a className='signUP' onClick={ForsignUp} >sign up</a>
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

function Step3({student, row}){
    return(<>
        <Container component="main" maxWidth="xs">
      
        <Typography component='h1' variant="h6">
        <div className='stuName'><h2 > أهلًا يا  {student[2]} </h2></div>
        <hr></hr>
        </Typography>
        <StudentPage data={student} row={row}/>
        
        </Container>
        </>
    )
}

function Step0({setNPass,setNSnom,Npass,Nsnom,Nname,setNname,signUp,Aleo}){
    return(<>
        <Container component="main" maxWidth="xs">
        <Box>
        <Typography component="h1" variant="h5">
        Sign-Up
        </Typography>
        <Box sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="user name"
            label="الأسم ثلاثي"
            name="الأسم ثلاثي"
            autoComplete="user name"
            autoFocus
            value={Nname}
            onChange={(e)=>setNname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="student code"
            label="student code"
            name="student code"
            autoComplete="student code"
            autoFocus
            value={Nsnom}
            onChange={(e)=>setNSnom(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={Npass}
            onChange={(e)=>setNPass(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signUp} // Call the function passed via props
          >
            Sign-Up
          </Button>
        </Box>
        {Aleo === true && <AlertoExist/>}
      </Box>

        </Container>
        </>
    )
}





export default function Body() {
    //##states##
    const [step, setStep] = useState(1);
    const [snom, setSnom] = useState(undefined);
    const [pass,setPass] = useState(undefined);
    const [Nsnom, setNSnom] = useState(undefined);
    const [Npass,setNPass] = useState(undefined);
    const [passwrong,setPasswrong] = useState(undefined);
    const [Nname,setNname] = useState(undefined);
    const [wrong,setwrong] = useState(undefined);
    const [Aleo,setAleo] = useState(false);
    const [student,setStudent] = useState([]);
    const [rememberMe, setRememberMe] = useState(false);
    const [row,setRow] = useState(0)
    const [signin,setsignin] = useState(0)
    //##button##
    //submit-button
    const bSubmit = () => setStep(step + 1);
    //const memoSubmit = () => setStep(step + 2);
    const bUnSubmit = () => setStep(step - 1);
    const BtnF = () => <button className='btnf'  onClick={BtnFC}>next</button>;
    const BtnFC = ()=>{bSubmit() ; fetchData(snom)}
    const BtnG = () => <button className='btng'   onClick={BtnGC}>submit</button>;
    const BtnGC = ()=>{if(pass === student[1]){
        setPasswrong(false)
        handleSubmit()
        bSubmit();
    }else{
        setPasswrong(true);
    }}
    const signUp = async () => {
        try {
          // Await the fetchData request to complete and use the return value
          const isWrong = await fetchData(Nsnom);
      
          // Check if the data is correct
          if (isWrong) {
            setAleo(false)
            console.log('Proceeding with sign-up');
            handleSignUp(); // Call the sign-up handler
            bSubmit(); // Move to the next step
          } else {
             setAleo(true)
          }
        } catch (error) {
          console.error('Error during sign-up:', error);
        }
      };
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
    const handlememo = () =>{
      console.log(snom);
      console.log(pass);
      fetchData(snom);
      //memoSubmit();
    }
//remember me 
// Run only once on component mount to load stored data
useEffect(() => {
  const studentcode = localStorage.getItem('code');
  const studentpass = localStorage.getItem('pass');
  
  if (studentcode) {
    setSnom(studentcode);
    setPass(studentpass);
    setsignin(1);
    setRememberMe(true); // Mark the checkbox as checked
  }
}, []); // Empty dependency array ensures this runs once on mount

// Separate useEffect to handle memoSubmit after snom and pass are updated
useEffect(() => {
  if (snom && pass && signin === 1 ) {
    // Now snom and pass have been updated, we can call handlememo safely
    setStep(3)
    handlememo();
  }
}, [snom, pass, signin]); // This effect runs whenever snom or pass are updated




const handleRememberMeChange = (e) => {
  setRememberMe(e.target.checked);
};

const handleSubmit = () => {
  if (rememberMe) {
    // Save the username in localStorage
    localStorage.setItem('code', snom);
    localStorage.setItem('pass', pass);
  } else {
    // Clear any stored username if the user unchecks "Remember Me"
    localStorage.removeItem('code');
    localStorage.removeItem('pass');
  } // Proceed with sign-in logic
};


// Update fetchData to return true/false based on match
const fetchData = async (v) => {
    try {
      const response = await axios.get('https://001-ochre-five.vercel.app/api/sheets', {
        params: {
          search: v,
          columns: 'A,B',
          sheet: 'Sheet1'
        }
      });
  
      // If status is 'false', indicate no match found
      if (response.data.status === 'false') {
        setwrong(true); // Mark as no match
        console.log('No match found');
        return true; // Indicate that data is wrong
      } else {
        setStudent(response.data.matches[0].student); // Set student data
        setRow(response.data.matches[0].index); // Set row data
        setwrong(false); // Mark as correct match
        console.log('Match found');
        return false; // Indicate data is correct
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return true; // Return true to indicate error, so sign-up doesn't proceed
    }
  };

      const handleSignUp = async () => {
        try {
          const response = await axios.post('https://001-ochre-five.vercel.app/api/sheets/add', {
            Sheet:"Sheet1",
            range:"A:C",
            column_a: `${Nsnom}`,
            column_b: `${Npass}`,
            column_c: `${Nname}`,
          });
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    

    return (
        <>
        <body>
            {step === 0 && <Step0 Aleo={Aleo} Nname={Nname} setNname={setNname} Nsnom={Nsnom} Npass={Npass} setNSnom={setNSnom} setNPass={setNPass} signUp={signUp}/>}
            {step === 1 && <Step1 snom={snom} rememberMe={rememberMe} ForsignUp={bUnSubmit} handleSet={handleSet}  BtnF={BtnF}  RememberMeChange={handleRememberMeChange}  />}
            {step === 2 && <Step2 passwrong={passwrong} pass={pass} handlePass={handlePass} student={student} BtnG={BtnG} />} 
            {step === 3 && <Step3 student={student} signIn={BtnGC} row={row}/>}
        </body>
        </>
    );
}

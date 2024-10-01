import StudentPage from './Student.jsx';
import React, { useState, memo,useEffect  } from 'react';
import VacationRequests from './admin.jsx'
import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import './App.css'
import axios from 'axios';
import Alerto from './Alerto'
import AlertoExist from './AlertoExist.jsx'
import Requestion from"./Requestion.jsx"
import Vstatus from"./VacationStatues.jsx"
import { Row } from 'react-aria-components';

function Step1 ({scode,rememberMe, handleSet, BtnF,ForsignUp,RememberMeChange}){
    return(<>
    <Container component="main" maxWidth="xs">
    <Stack  direction='column'
            spacing={1}
            sx={{
                justifyContent: "center",
                }}
  >
    <Typography component="h1" variant="h5" sx={{alignSelf:'center',fontFamily:'amiri',fontWeight:'400',fontSize:'1.5em'}} >
        تسجيل الدخول
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
            value={scode}
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
            control={<Checkbox checked={rememberMe} onChange={RememberMeChange}  />}
            label="تذكرني"
            
          />
    <a className='signUP'  onClick={ForsignUp} >تعيين كلمة السر</a>
    </Stack>
    </Stack> 
    </Container>
    </> )}

function Step2 ({ bUnSubmit,passwrong,pass,handlePass,BtnG,student }){
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
    <Button
            variant="contained"
            sx={{ width:'50%', mt: 3, mb: 2 ,backgroundColor:'grey',fontFamily:'amiri',fontWeight:'700',fontSize:'1em' }}
            onClick={bUnSubmit} // Call the function passed via props
          >
            عودة
          </Button>
    {passwrong === true && <Alerto></Alerto>}
    </Stack>
    </Stack>
    </Container>
    </>)}

function Step3({student, row, dostep,Vstatus,scode,pendingv,setpendingv,totalV_C,totalV_E}){


    return(<>
        <Container component="main" maxWidth="xs">
      
        <Typography component='h1' variant="h6">
        <div className='stuName'><h2 > أهلًا يا  {student[2]} </h2></div>
        <hr></hr>
        </Typography>
        <Stack direction={row} fullWidth>
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize:'1em',fontFamily:'amiri' }}
            onClick={() => dostep()} // Call the function passed via props
          >
            طلب إجازة
          </Button>
        </Stack>
        <StudentPage totalV_C={totalV_C} totalV_E={totalV_E} data={student} row={row}/>
        <Vstatus pendingv={pendingv} setpendingv={setpendingv} scode={scode}/>
        
        </Container>
        </>
    )
}

function Step0({bSubmit,setNPass,setNscode,Npass,Nscode,Nname,setNname,signUp,Aleo}){
    return(<>
        <Container component="main" maxWidth="xs">
        <Box>
        <Typography component="h1" variant="h5">
        تغيير كلمة السر 
        </Typography>
        <Box sx={{ mt: 1 }}>
        {/* <TextField
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
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="student code"
            label="student code"
            name="student code"
            autoComplete="student code"
            autoFocus
            value={Nscode}
            onChange={(e)=>setNscode(e.target.value)}
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
            sx={{ mt: 3, mb: 2,fontFamily:'amiri',fontWeight:'700',fontSize:'1em' }}
            onClick={signUp} // Call the function passed via props
          >
            تأكيد
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,backgroundColor:'grey',fontFamily:'amiri',fontWeight:'700',fontSize:'1em' }}
            onClick={bSubmit} // Call the function passed via props
          >
            عودة
          </Button>
        </Box>
        {Aleo === true && <AlertoExist/>}
      </Box>

        </Container>
        </>
    )
}
function Adminp({VacationRequests,isAdmin}){ 
  return(<>
      <Container component="main" maxWidth="md">
    
      <VacationRequests isAdmin ={isAdmin}/>
      </Container>
      </>
  )
}




export default function Body() {
    //##states##
    const [step, setStep] = useState(1);
    const [scode, setscode] = useState(undefined);
    const [sname, setsname] = useState(undefined);
    const [pass,setPass] = useState(undefined);
    const [Nscode, setNscode] = useState(undefined);
    const [Npass,setNPass] = useState(undefined);
    const [passwrong,setPasswrong] = useState(undefined);
    const [Nname,setNname] = useState(undefined);
    const [wrong,setwrong] = useState(undefined);
    const [Aleo,setAleo] = useState(false);
    const [student,setStudent] = useState([]);
    const [rememberMe, setRememberMe] = useState(false);
    const [row,setRow] = useState(0)
    const [signin,setsignin] = useState(0)
    const [isAdmin,setisAdmin] = useState(0)
    //vacation

    const [E_vacation,setE_vacation] = useState(2);
    const [C_vacation,setC_vacation] = useState(7.5);
    const [totalV_C,settotalV_C] = useState('wait');
    const [totalV_E,settotalV_E] = useState('wait');
    //month setter
    const today = new Date();
    const month = today.getMonth() + 1;
    //vacations setter
    const [Vtotaldayslimit,setVtotaldayslimit] = useState(4)
    const [Vtotaldays,setVtotaldays] = useState(0)
    const [pendingv,setpendingv] = useState(0)
    const [MaxCvacation,setMaxCvacation] = useState(15)
    const [MaxEvacation,setMaxEvacation] = useState(3)
    const periods = [
      [10, 11], [12, 1], [2, 3], [4, 5], [6, 7], [8, 9]
  ];
    //##button##
    //submit-button
    const bSubmit = () => setStep(step + 1);
    //const memoSubmit = () => setStep(step + 2);
    const bUnSubmit = () => setStep(step - 1);
    const BtnF = () => <button className='btnf'  onClick={BtnFC}>التالي</button>;
    const BtnFC = ()=>{bSubmit() ; fetchData(scode)}
    const BtnunF = () => <button className='btnf'  onClick={BtnunFC}>رجوع</button>;
    const BtnunFC = ()=>{bUnSubmit()}
    const BtnG = () => <button className='btng'   onClick={BtnGC}>تأكيد</button>;
    const BtnGC = ()=>{if(pass === student[1]){
        setPasswrong(false)

        handleSubmit()

        if(isAdmin === 1){
          setStep(10)
        }else{
          bSubmit()
        }
        
        
        ;
    }else{
        setPasswrong(true);
    }}
    const signUp = async () => {

          // Await the fetchData request to complete and use the return value
      
          // Check if the data is correct
            setAleo(false)
            console.log('Proceeding with sign-up');
            handleSignUp(); // Call the sign-up handler
            bSubmit(); // Move to the next step


      };
    //##handlers##
    //handle-setting number
    const handleSet = (e) => {
        setscode(e.target.value);
        console.log(scode)
    };
    //handle-password
    const handlePass = (e) => {
        setPass(e.target.value);
        console.log(pass)
    };
    const handlememo = () =>{
      console.log(scode);
      console.log(pass);
      fetchData(scode);
      //memoSubmit();
    }
//remember me 
// Run only once on component mount to load stored data
useEffect(() => {
  const isAdmin = localStorage.getItem('admin');
  const studentcode = localStorage.getItem('code');
  const studentpass = localStorage.getItem('pass');
  if (studentcode,studentpass,isAdmin) {
    setisAdmin(isAdmin);
    setscode(studentcode);
    setPass(studentpass);
    setsignin(1);
    console.log(studentpass,studentcode,isAdmin)
    setRememberMe(true); // Mark the checkbox as checked
  }
}, []); // Empty dependency array ensures this runs once on mount

// Separate useEffect to handle memoSubmit after scode and pass are updated
useEffect(() => {
  if (scode && pass && signin === 1 && isAdmin === 1 ) {
    // Now scode and pass have been updated, we can call handlememo safely
    setStep(10)

  }else if (scode && pass && signin === 1) {
    setStep(3)
    handlememo();
  };
}, [scode, pass, signin, isAdmin]); // This effect runs whenever scode or pass are updated




const handleRememberMeChange = (e) => {
  setRememberMe(e.target.checked);
};

const handleSubmit = () => {
  
  if (rememberMe) {
    // Save the username in localStorage
    localStorage.setItem('code', scode);
    localStorage.setItem('pass', pass);
    localStorage.setItem('admin', isAdmin);
  } else {
    // Clear any stored username if the user unchecks "Remember Me"
    localStorage.removeItem('code');
    localStorage.removeItem('pass');
    localStorage.removeItem('admin');
  } // Proceed with sign-in logic
};

//test hereeeeeeeee
useEffect(()=>{
  // the total C is: C_vacation-student[37]
  settotalV_C('معلق حتى شهر 4')
  settotalV_E(E_vacation-student[38])

},[student])

// Update fetchData to return true/false based on match
const fetchData = async (v) => {
    try {
      const response = await axios.post('https://001-ochre-five.vercel.app/api/sheets/sign_in', {
      scode:`${scode}`,
      });
  
      // If status is 'false', indicate no match found
      if (response.data.status === 'false') {
        setwrong(true); // Mark as no match
        console.log('No match found');
        return true; // Indicate that data is wrong
      } else {
        setStudent(response.data.matches.student); // Set student data
        setsname(response.data.matches.student[2]);
        setscode(response.data.matches.student[0]);
        setVtotaldays(Number(response.data.matches.student[36]));
        setisAdmin(Number(response.data.matches.student[37]));
        
        setRow(response.data.matches.index[0]); // Set row data
        // console.log(`are u ----------- ${row}`);
        setwrong(false); // Mark as correct match

        return false; // Indicate data is correct
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return true; // Return true to indicate error, so sign-up doesn't proceed
    }
  };

      const handleSignUp = async () => {
        try {
          const response = await axios.post('https://001-ochre-five.vercel.app/api/sheets/change_pass', {
            scode:`${Nscode}`,
            pass:`${Npass}`,
          });
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };


    return (
        <>
        <body>
            {step === 0 && <Step0 bSubmit={bSubmit} Aleo={Aleo} Nname={Nname} setNname={setNname} Nscode={Nscode} Npass={Npass} setNscode={setNscode} setNPass={setNPass} signUp={signUp}/>}
            {step === 1 && <Step1 scode={scode} rememberMe={rememberMe} ForsignUp={bUnSubmit} handleSet={handleSet}  BtnF={BtnF}  RememberMeChange={handleRememberMeChange}  />}
            {step === 2 && <Step2 bUnSubmit={bUnSubmit} passwrong={passwrong} pass={pass} handlePass={handlePass} student={student} BtnG={BtnG} />} 
            {step === 3 && <Step3 totalV_C={totalV_C} totalV_E={totalV_E} student={student} pendingv={pendingv} setpendingv={setpendingv} signIn={BtnGC} dostep={bSubmit} row={row} Vstatus={Vstatus} scode={scode} />}
            {step === 4 && <Requestion fetchData={fetchData} totalV_E={totalV_E} totalV_C={totalV_C} pendingv={pendingv} BtnunF={BtnunF} scode={scode} sname={sname} setStep={setStep} Vtotaldays={Vtotaldays} setVtotaldays={setVtotaldays} Vtotaldayslimit={Vtotaldayslimit} />}
            {step === 10 && <Adminp VacationRequests={VacationRequests} isAdmin={isAdmin}/>}
        </body>
        </>
    );
}

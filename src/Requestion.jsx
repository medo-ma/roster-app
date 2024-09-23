import './App.css'
import AlertoV from'./AlertoV.jsx'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField, Stack,Container} from '@mui/material';
import { useState, memo,useEffect  } from 'react';
import axios from 'axios';


function Page0({settype,type,BtnP,BtnunF,Vtotaldays,totalV_C,totalV_E}){
  const [disV_c,setdisV_c]=useState(false)
  const [disV_e,setdisV_e]=useState(false)
  const date = new Date() 
  const month = date.getMonth() + 1
  const year = date.getUTCFullYear()
  useEffect(() => {
  if(totalV_E === 0){
    setdisV_e(true)
  };
  if(year < 2025 ){
    setdisV_c(true)
  }else if(month > 3){
    setdisV_c(true)
  }else if(totalV_C===0){
    setdisV_e(true)
  }
  console.log(year,month)
  } )
return(
<>
<Container component="main" maxWidth="xs">
<div className='stuName'><h2 > اختر نوع الإجازة</h2></div>
<hr></hr>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> نوع الإجازة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="نوع الإجازة"
          onChange={(e)=>settype(e.target.value)}
        >
          <MenuItem value={"C"} disabled={disV_c}>اعتيادي - معطلة حتى شهر 4 -</MenuItem>
          <MenuItem value={"E"} disabled={disV_e}>عارضة</MenuItem>
        </Select>
      </FormControl>
      <BtnunF/>
      {type !== undefined && <BtnP/>} 

    </Box>
    <div><h2>{Vtotaldays}</h2></div>
    </Container>
</>
)

}

function Page1({firstV,setfirstV,firstVmonth,setfirstVmonth,BtnP,BtnunP,Vtotaldays}){
    const [error, setError] = useState(false);
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    return(
<>
<Container component="main" maxWidth="xs">

<div className='stuName'><h2 >حدد اليوم الأول</h2></div>
<hr></hr>
<Box sx={{ minWidth: 120 }}>

<Stack direction='row'>
<TextField  
            
            sx={{width:'100%'}}
            margin="normal"
            required
            fullWidth
            type='number'
            id="first"
            label="day 1"
            Value={firstV}
            onChange={(e)=>setfirstV(e.target.value)}
            helperText=""
        />
<TextField  

            sx={{width:'100%'}}
            margin="normal"
            required
            fullWidth
            type="number"
            id="outlined-error-helper-text"
            label="month"
            Value={firstVmonth}
            onChange={(e)=>setfirstVmonth(e.target.value)}
            helperText=""
        />
</Stack>

<BtnunP/>
<BtnP/>

{(firstVmonth > month )
  ? <AlertoV />
  : ((firstV > day) && (firstVmonth == month)) && <AlertoV />
}

</Box>
<div><h2>{Vtotaldays}</h2></div>
</Container>
</>
    );
}
function Page2({secondV,setsecondV,secondVmonth,setsecondVmonth,BtnP,BtnunP,Vtotaldays}){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    return(<>
<Container component="main" maxWidth="xs">

<Box sx={{ minWidth: 120 }}>
<div className='stuName'><h2 > حدد اليوم الثاني أو تخطى</h2></div>
<hr></hr>
<Stack direction='row'>
<TextField
            required
            sx={{width:'100%'}}
            margin="normal"
            fullWidth
            type="number"
            id="first"
            label="day 2"
            Value={secondV}
            onChange={(e)=>setsecondV(e.target.value)}
            helperText=""
        />
<TextField
            
            sx={{width:'100%'}}
            margin="normal"
            fullWidth
            type="number"
            id="outlined-error-helper-text"
            label="month"
            Value={secondVmonth}
            onChange={(e)=>setsecondVmonth(e.target.value)}
            helperText=""
        />
</Stack>
<BtnunP/>
<BtnP/>

{(secondVmonth > month )
  ? <AlertoV />
  : ((secondV > day) && (secondVmonth == month)) && <AlertoV />
}
</Box>
<div><h2>{Vtotaldays}</h2></div>
</Container>
</>);
}

function Page3({thirdV,setthirdV,thirdVmonth,setthirdVmonth,BtnP,BtnunP,}){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    return(<>
<Container component="main" maxWidth="xs">
<div className='stuName'><h2 >حدد اليوم الثالث أو تخطى</h2></div>
<hr></hr>
<Box sx={{ minWidth: 120 }}>
<Stack direction='row'>
<TextField
            required
            sx={{width:'100%'}}
            margin="normal"
            fullWidth
            type="number"
            id="first"
            label="day 3"
            Value={thirdV}
            onChange={(e)=>setthirdV(e.target.value)}
            helperText=""
        />
<TextField

            sx={{width:'100%'}}
            margin="normal"
            fullWidth
            type="number"
            id="outlined-error-helper-text"
            label="month"
            Value={thirdVmonth}
            onChange={(e)=>setthirdVmonth(e.target.value)}
            helperText=""
        />
</Stack>
<BtnunP/>
<BtnP/>

{(thirdVmonth > month )
  ? <AlertoV />
  : ((thirdV > day) && (thirdVmonth == month)) && <AlertoV />
}
</Box>
</Container>
</>);
}

function Page4({BtnSubmit,BtnunP}){
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  return(<>
<Container component="main" maxWidth="xs">
<div className='stuName'><h2 >متأكد من إجازاتك؟</h2></div>
<hr></hr>
<Box sx={{ minWidth: 120 }}>

<BtnunP/>
<BtnSubmit/>
</Box>
</Container>
</>);
}
function Page5({BtnunP}){
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  return(<>
<Container component="main" maxWidth="xs">
<div className='stuName'><h2 >رصيد إجازاتك لا يكفي</h2></div>
<hr></hr>
<Box sx={{ minWidth: 120 }}>

<BtnunP/>
</Box>
</Container>
</>);
}

export default function Requestion({fetchData,totalV_E,totalV_C,pendingv,BtnunF,scode,sname,setStep,Vtotaldayslimit,Vtotaldays,setVtotaldays}){

    const [page,setpage] = useState(0)
    const [notOvtotaldays, setnotOvtotaldays] = useState(Vtotaldays);
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const [type,settype] = useState(undefined)
    const [firstV,setfirstV] = useState(0);
    const [firstVmonth,setfirstVmonth] = useState(0);
    const [secondV,setsecondV] = useState(0);
    const [secondVmonth,setsecondVmonth] = useState(0);
    const [thirdV,setthirdV] = useState(0);
    const [thirdVmonth,setthirdVmonth] = useState(0);
    const [exceededlimit,setexceededlimit]=useState(false);
    const BtnP = () => <button className='btnf'  onClick={dopage}>next</button>;
    function dopage(){console.log(page,pendingv,notOvtotaldays);
    if(exceededlimit){setpage(4)}else if(!exceededlimit && page != 0 ){setnotOvtotaldays(notOvtotaldays + 1);setpage(page + 1);} else{setpage(page + 1);};
    
    }
    const BtnunP = () => <button className='btnf'  onClick={undopage}>back</button>;
    function undopage(){
      if(page==0 || page==1 ){setpage(page - 1);}else if(page === 5){setStep(3)}else if(page === 4){setpage(0);setnotOvtotaldays(Vtotaldays)}else {setnotOvtotaldays(notOvtotaldays - 1);setpage(page - 1);}

    }
    const BtnSubmit = () => <button className='btnf'  onClick={submit}>Submit</button>;
    const submit = async () => {
        requestV();
        setStep(3)
    }
////////////////////////////here .....
    useEffect(()=>{
      if (pendingv === 3){
        setpage(5)
      }else if(pendingv !== 0 && page === 0 ){
          console.log(`proplem is here ${pendingv} ${notOvtotaldays}`)
          setnotOvtotaldays(pendingv + notOvtotaldays)
          
        }else{
          console.log(`proplem not`)
        }

    },[pendingv,page])

//monitior for vacation limit
useEffect(() => {
  const checklimit = () => {
    if (notOvtotaldays === 3 && Vtotaldays === 3 ||Vtotaldayslimit - notOvtotaldays <= 0 || page === 0 && notOvtotaldays === 4 ) {
      console.log(`first : ${notOvtotaldays}`)
      setpage(5)
      setexceededlimit(true);
    }else if(notOvtotaldays === 3){
      setpage(4)
      console.log(`notOvtotaldays === 3 : ${notOvtotaldays} ${pendingv} `)
      
    }else{
      setexceededlimit(false);
      console.log(notOvtotaldays)
    }
  };
  checklimit(); // Call the function here
}, [page]);


/* request a vacation */
const requestV = async () => {
    try {
      // Create a JSON object for vacation dates
      const vacationDates = {};

      if (firstVmonth !== 0 && firstV !== 0) {
        vacationDates.first = { month: firstVmonth, day: firstV };
      }
      
      if (secondVmonth !== 0 && secondV !== 0) {
        vacationDates.second = { month: secondVmonth, day: secondV };
      }
      
      if (thirdVmonth !== 0 && thirdV !== 0) {
        vacationDates.third = { month: thirdVmonth, day: thirdV };
      }
      
      const vacationDatesString = JSON.stringify(vacationDates);
  
      const response = await axios.post('https://001-ochre-five.vercel.app/api/sheets/add', {
        Sheet: `Requests-${type}`,      // Vacation type (e.g., "C" or "E")
        range: "A:D",                   // Adjust range, only A:D needed now (status in separate column)
        column_a: `${scode}`,            // Student code (unique ID)
        column_b: `${sname}`,            // Student name
        column_c: vacationDatesString,         // Store the JSON string of all vacation dates in one cell
        column_d: "Pending"             // Initial status of the vacation request
      });
      console.log('Response:', response.data);
      setTimeout(() => {
        fetchData;
      }, 2000);
    }catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
<>

{page === 0 && <Page0 totalV_E={totalV_E} totalV_C={totalV_C} type={type} Vtotaldays={notOvtotaldays} settype={settype} BtnP={BtnP} BtnunF={BtnunF} />}
{page === 1 && <Page1 firstV={firstV} Vtotaldays={notOvtotaldays} setfirstV={setfirstV}  firstVmonth={firstVmonth} setfirstVmonth={setfirstVmonth}   BtnP={BtnP} BtnunP={BtnunP} />}
{page === 2 && <Page2 secondV={secondV} Vtotaldays={notOvtotaldays} setsecondV={setsecondV} secondVmonth={secondVmonth} setsecondVmonth={setsecondVmonth} BtnP={BtnP} BtnunP={BtnunP} />}
{page === 3 && <Page3 thirdV={thirdV} Vtotaldays={notOvtotaldays} setthirdV={setthirdV} thirdVmonth={thirdVmonth} setthirdVmonth={setthirdVmonth} BtnunP={BtnunP} BtnP={BtnP}/>}
{page === 4 && <Page4 thirdV={thirdV} Vtotaldays={notOvtotaldays} setthirdV={setthirdV} thirdVmonth={thirdVmonth} setthirdVmonth={setthirdVmonth} BtnunP={BtnunP} BtnSubmit={BtnSubmit}/>}
{page === 5 && <Page5 thirdV={thirdV} Vtotaldays={notOvtotaldays} setthirdV={setthirdV} thirdVmonth={thirdVmonth} setthirdVmonth={setthirdVmonth} BtnunP={BtnunP} BtnSubmit={BtnSubmit}/>}

</>
  );

}
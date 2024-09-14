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


function Page0({settype,type,BtnP,BtnunF}){
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
          <MenuItem value={"C"}>اعتيادي</MenuItem>
          <MenuItem value={"E"}>عارضة</MenuItem>
        </Select>
      </FormControl>
      <BtnunF/>
      <BtnP/> 

    </Box>
    </Container>
</>
)

}

function Page1({firstV,setfirstV,firstVmonth,setfirstVmonth,BtnP,BtnunP}){
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
</Container>
</>
    );
}
function Page2({secondV,setsecondV,secondVmonth,setsecondVmonth,BtnP,BtnunP}){
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
</Container>
</>);
}

function Page3({thirdV,setthirdV,thirdVmonth,setthirdVmonth,BtnSubmit,BtnunP}){
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
<BtnSubmit/>

{(thirdVmonth > month )
  ? <AlertoV />
  : ((thirdV > day) && (thirdVmonth == month)) && <AlertoV />
}
</Box>
</Container>
</>);
}

export default function Requestion({BtnunF,scode,sname}){

    const [page,setpage] = useState(0)
    const [error, setError] = useState(false);
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

    const BtnP = () => <button className='btnf'  onClick={dopage}>next</button>;
    function dopage(){
    setpage(page + 1);
    }
    const BtnunP = () => <button className='btnf'  onClick={undopage}>back</button>;
    function undopage(){
    setpage(page - 1);
    }
    const BtnSubmit = () => <button className='btnf'  onClick={submit}>Submit</button>;
    const submit = async () => {
        requestV();
    }


/* request a vacation */
const requestV = async () => {
    try {
      // Create a JSON object for vacation dates
      const vacationDates = JSON.stringify({
        first: { month: firstVmonth, day: firstV },
        second: { month: secondVmonth, day: secondV },
        third: { month: thirdVmonth, day: thirdV }
      });
  
      const response = await axios.post('https://001-ochre-five.vercel.app/api/sheets/add', {
        Sheet: `Requests-${type}`,      // Vacation type (e.g., "C" or "E")
        range: "A:D",                   // Adjust range, only A:D needed now (status in separate column)
        column_a: `${scode}`,            // Student code (unique ID)
        column_b: `${sname}`,            // Student name
        column_c: vacationDates,         // Store the JSON string of all vacation dates in one cell
        column_d: "Pending"             // Initial status of the vacation request
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
<>

{page === 0 && <Page0 type={type} settype={settype} BtnP={BtnP} BtnunF={BtnunF} />}
{page === 1 && <Page1 firstV={firstV} setfirstV={setfirstV}  firstVmonth={firstVmonth} setfirstVmonth={setfirstVmonth}   BtnP={BtnP} BtnunP={BtnunP} />}
{page === 2 && <Page2 secondV={secondV} setsecondV={setsecondV} secondVmonth={secondVmonth} setsecondVmonth={setsecondVmonth} BtnP={BtnP} BtnunP={BtnunP} />}
{page === 3 && <Page3 thirdV={thirdV} setthirdV={setthirdV} thirdVmonth={thirdVmonth} setthirdVmonth={setthirdVmonth} BtnunP={BtnunP} BtnSubmit={BtnSubmit}/>}

</>
  );

}
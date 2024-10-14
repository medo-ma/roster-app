import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import '../app.css'
import StudentPage from '../Student.jsx';


export default function Step3({student, row,Vstatus ,dostep,scode,pendingv,setpendingv,totalV_C,totalV_E}){


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
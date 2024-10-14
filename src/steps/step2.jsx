import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import Alerto from '../Alerto'
import '../app.css'

export default function Step2 ({ bUnSubmit,passwrong,pass,handlePass,BtnG,student }){
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
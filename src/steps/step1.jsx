import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';

import '../app.css'

export default function Step1 ({scode,rememberMe, handleSet, BtnF,ForsignUp,RememberMeChange}){
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
    <a className='signUP'  onClick={ForsignUp} >تعيين كلمة السر</a>
    </Stack>
    </Stack> 
    </Container>
    </> )}
import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import '../app.css'

export default function Step0({bSubmit,setNPass,setNscode,Npass,Nscode,Nname,setNname,signUp,Aleo}){
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
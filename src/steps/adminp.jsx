import VacationRequests from '../admin.jsx'
import { Stack,Button, TextField, Box, Typography, Container,Checkbox,FormControlLabel } from '@mui/material';
import '../App.css'

export default function Adminp({VacationRequests,isAdmin}){ 
  return(<>
      <Container component="main" maxWidth="md">
    
      <VacationRequests isAdmin ={isAdmin}/>
      </Container>
      </>
  )
}
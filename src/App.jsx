import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Grid, Container,Stack } from '@mui/material';

function App() {
  
  return (
  <>
  <Container maxWidth='md'>
    <Stack direction="column" alignItems="stretch" justifyContent="space-around" spacing={5}>
        <Header/> 
        <Body title={false}/>
        
        <Footer/>
        
    </Stack>
  </Container>
  </>

  );
  
}

export default App;

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Grid, Container,Stack } from '@mui/material';

function App() {
  
  return (
  <>
  <Container maxWidth='md'  >
  <Header/>
    <Stack minHeight='100vh' direction="column" alignItems='stretch' justifyContent="space-around" spacing={5}>
         
        <Body title={false}/>
        
        
        
    </Stack>
    <Footer/>
  </Container>
  
  </>

  );
  
}

export default App;

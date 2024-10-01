import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Grid, Container,Stack } from '@mui/material';
import { LoadingProvider } from './loading/LoadingContext.jsx';
import LoadingOverlay from './loading/LoadingOverlay.jsx';
function App() {
  
  return (
  <>
  
  <Header/>
  <Container maxWidth='md'  >
  
    <Stack minHeight='100vh' direction="column" alignItems='stretch' justifyContent="space-around" spacing={2}>
         
        
    <LoadingProvider>
    <LoadingOverlay />
    <Body title={false}/>
      
    </LoadingProvider>
        
        
    </Stack>
    <Footer/>
  </Container>
  
  </>

  );
  
}

export default App;

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Ctaple from './admin/Ctaple';
import Etaple from './admin/Etaple'


// Helper function to format the dates from JSON


const VacationRequests = ({ isAdmin }) => {







//taps
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
  return (<>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    <Tabs value={value} onChange={handleChange} centered>
      <Tab label="عوارض" />
      <Tab label="اعتيادي" />
      <Tab label="السجل" disabled  />
    </Tabs>
  </Box>

  {value === 1 && <Ctaple isAdmin={isAdmin}/>}
  {value === 0 && <Etaple isAdmin={isAdmin}/>}
    </>);
};

export default VacationRequests;

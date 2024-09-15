import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Helper function to format a single date
const formatDate = (month, day) => {
    const date = new Date(2024, month - 1, day); // Placeholder year
    const options = { month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

// Helper function to format the dates from JSON
const formatDates = (datesString) => {
    try {
        const dates = JSON.parse(datesString);
        const formattedDates = [];

        if (dates.first) {
            formattedDates.push(formatDate(dates.first.month, dates.first.day));
        }
        if (dates.second) {
            formattedDates.push(formatDate(dates.second.month, dates.second.day));
        }
        if (dates.third) {
            formattedDates.push(formatDate(dates.third.month, dates.third.day));
        }

        return formattedDates.join(' | ');
    } catch (error) {
        console.error('Error parsing dates:', error);
        return 'Invalid date format';
    }
};

const VacationRequests = ({ isAdmin }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch vacation requests from the API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://001-ochre-five.vercel.app/api/sheets/requests');
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to fetch vacation requests.');
      }
    };

    fetchRequests();
  }, []);

  // Function to approve or reject a request by row index
  const updateStatus = async (rowIndex, scode, status, dates) => {
    try {
      await axios.post('https://001-ochre-five.vercel.app/api/sheets/update-status', {
        row_index: rowIndex,  // Row index in the Google Sheets
        scode,                // Student code
        status,               // Status to update (Approved/Rejected)
        dates                 // Dates in JSON format
      });
      // Update UI after status change
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.rowIndex === rowIndex ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update the request status.');
    }
  };

  // Filter to only show pending requests
  const pendingRequests = requests.filter(req => req.status === 'Pending');


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
      <Tab label="السجل" />
    </Tabs>
  </Box>
    <div>
      <h2>العوارض قيد المراجعة</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Student Code</th>
            <th>Student Name</th>
            <th>Vacation Dates</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {pendingRequests.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 5 : 4}>No pending requests</td>
            </tr>
          ) : (
            pendingRequests.map((req) => (
              <tr key={req.rowIndex}>
                <td>{req.scode}</td>
                <td>{req.sname}</td>
                <td>{formatDates(req.dates)}</td>
                <td>{req.status}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => updateStatus(req.rowIndex, req.scode, 'Approved', req.dates)}>Approve</button>
                    <button onClick={() => updateStatus(req.rowIndex, req.scode, 'Rejected', req.dates)}>Reject</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>);
};

export default VacationRequests;

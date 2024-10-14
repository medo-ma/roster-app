import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Stack} from '@mui/material';

export default function Etaple({ isAdmin }) {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
  
    // Fetch vacation requests from the API
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await axios.get('https://001-ochre-five.vercel.app/api/sheets/requests',
            {params:{
              
  
            }}
          );
          setRequests(response.data.requests);
        } catch (error) {
          console.error('Error fetching requests:', error);
          setError('Failed to fetch vacation requests.');
        }
      };
  
      fetchRequests();
    }, []);
  // Filter to only show pending requests
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

  // Helper function to format a single date
  const formatDate = (month, day) => {
    const date = new Date(2024, month - 1, day); // Placeholder year
    const options = { month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  // Function to approve or reject a request by row index
  const updateStatus = async (rowIndex, scode, status, dates , type) => {
    try {
      await axios.post('https://001-ochre-five.vercel.app/api/sheets/update-status', {
        row_index: rowIndex,  // Row index in the Google Sheets
        scode,                // Student code
        status,               // Status to update (Approved/Rejected)
        dates,                 // Dates in JSON format
        type
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

  // Ensure requests is an array before filtering
  const pendingRequests = Array.isArray(requests) ? requests.filter(req => req.status === 'Pending' && (req.type === 'E' || req.type === 'HE')) : [];

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
        <th> </th>
        {/* <th>حالة الطلب</th> */}
        <th>نوع الاجازة</th>
        <th>تواريخ الإجازة المطلوبة</th>
        <th>الاسم</th>
        {/* <th>رمز الطالب</th> */}
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

                <td >
                <div className='button-container'>
                <button className="Rejected" onClick={() => updateStatus(req.rowIndex, req.scode, 'Rejected', req.dates,req.type)}>رفض</button>
                <button className="Approved" onClick={() => updateStatus(req.rowIndex, req.scode, 'Approved', req.dates,req.type)}>قبول</button>
                </div>
                </td>

                {/* <td>{req.status}</td> */}
                <td>{req.type}</td>
                <td>{formatDates(req.dates)}</td>
                <td>{req.sname}</td>
                {/* <td>{req.scode}</td> */}

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

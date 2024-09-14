import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format a single date
const formatDate = (month, day) => {
    const date = new Date(month - 1, day); // Using 2024 as a placeholder year
    const options = { month: '2-digit', day: '2-digit'};
    return date.toLocaleDateString(undefined, options); // Format: MM/DD/YYYY
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
  
      return formattedDates.join('\n | ');
    } catch (error) {
      return 'Invalid date format';
    }
  };

const Vstatus = ({ scode }) => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
  
    // Fetch student's vacation requests
    useEffect(() => {
      const fetchStudentRequests = async () => {
        try {
          const response = await axios.get('https://001-ochre-five.vercel.app/api/sheets/student-requests', {
            params: { scode }
          });
          setRequests(response.data.requests);
        } catch (error) {
          setError('Error fetching requests: ' + (error.response?.data?.error || error.message));
          console.error('Error details:', error);  // Log more details to debug
        }
      };
  
      fetchStudentRequests();
    }, [scode]);
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (requests.length === 0) {
      return <div>No vacation requests found for this student.</div>;
    }
  
    return (
      <div>
        <h2>Your Vacation Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Vacation Dates</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{formatDates(req.dates)}</td> {/* Format and display vacation dates */}
                <td>{req.status}</td> {/* Show the status (Pending, Approved, Rejected) */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

};

export default Vstatus;

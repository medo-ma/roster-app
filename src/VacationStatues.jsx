import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format a single date
const formatDate = (month, day) => {
    const date = new Date(2024, month - 1, day); // Using 2024 as a placeholder year
    const options = { month: '2-digit', day: '2-digit' };
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

        return formattedDates.join(' | ');
    } catch (error) {
        console.error('Error parsing dates:', error);
        return 'Invalid date format';
    }
};

const Vstatus = ({ scode }) => {
    const [requests_c, setRequests_c] = useState([]);
    const [requests_e, setRequests_e] = useState([]);

    // Fetch student's vacation requests
    useEffect(() => {
        const fetchStudentRequestsE = async () => {
            try {
                const responseE = await axios.get('https://001-ochre-five.vercel.app/api/sheets/student-requests_e', {
                    params: { scode }
                });
                console.log('Requests-E:', responseE.data.requests);
                setRequests_e(responseE.data.requests);
            } catch (error) {
                console.error('Error fetching student requests E:', error);
            }
        };
    
        fetchStudentRequestsE();
    }, [scode]);
    
    useEffect(() => {
        const fetchStudentRequestsC = async () => {
            try {
                const responseC = await axios.get('https://001-ochre-five.vercel.app/api/sheets/student-requests_c', {
                    params: { scode }
                });
                console.log('Requests-C:', responseC.data.requests);
                setRequests_c(responseC.data.requests);
            } catch (error) {
                console.error('Error fetching student requests C:', error);
            }
        };
    
        fetchStudentRequestsC();
    }, [scode]);
    

    return (
        <>
            <div>
                <table>
                    <caption>طلبات العوارض</caption>
                    <thead>
                        <tr>
                            <th>حالة الطلب</th>
                            <th>الأيام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests_e.length === 0 ? (
                            <tr><td>لا يوجد</td><td>لا يوجد</td></tr>
                        ) : (
                            requests_e.map((req, index) => (
                                <tr key={index}>
                                    <td>{req.status}</td> {/* Show the status (Pending, Approved, Rejected) */}
                                    <td>{formatDates(req.dates)}</td> {/* Format and display vacation dates */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <table>
                    <caption>طلبات الاعتيادي</caption>
                    <thead>
                        <tr>
                            <th>حالة الطلب</th>
                            <th>الأيام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests_c.length === 0 ? (
                            <tr><td>لا يوجد</td><td>لا يوجد</td></tr>
                        ) : (
                            requests_c.map((req, index) => (
                                <tr key={index}>
                                    <td>{req.status}</td> {/* Show the status (Pending, Approved, Rejected) */}
                                    <td>{formatDates(req.dates)}</td> {/* Format and display vacation dates */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Vstatus;

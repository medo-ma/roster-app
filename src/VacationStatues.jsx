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

const Vstatus = ({ scode, pendingv, setpendingv }) => {
    const [requests, setRequests] = useState([]);
    const lookhere='loook here>>>>>>>>>>>>>>'
    useEffect(()=> {
    const pendingVfetcher =()=>{
    const pend_e = requests.filter(req => req.status === 'Pending' && (req.type === 'HE' || req.type === 'E'));
    const pend_enum = pend_e.filter(request => {
        let dates;
        try {
            dates = JSON.parse(request.dates);
        } catch (e) {
            return false; // Skip this request if dates cannot be parsed
        }

        // Ensure dates.first is defined and has a non-empty day value
        if (!dates.first || dates.first.day === undefined || dates.first.day === "") {
            return false;
        }

        return true;
    })
    .map(request => {
        let dates = JSON.parse(request.dates);
        return [
            dates.first.day,
            dates.second && dates.second.day !== undefined && dates.second.day !== "" ? dates.second.day : undefined,
            dates.third && dates.third.day !== undefined && dates.third.day !== "" ? dates.third.day : undefined
        ];
    })
    .flat() // Flatten the array of arrays into a single array
    .filter(day => day !== undefined && day !== ""); // Flatten the array of arrays into a single array
    
    
    const pend_c = requests.filter(req => req.status === 'Pending' && (req.type === 'HC' || req.type === 'C'));
    const pend_cnum = pend_c.filter(request => {
        let dates;
        try {
            dates = JSON.parse(request.dates);
        } catch (e) {
            return false; // Skip this request if dates cannot be parsed
        }

        // Ensure dates.first is defined and has a non-empty day value
        if (!dates.first || dates.first.day === undefined || dates.first.day === "") {
            return false;
        }

        return true;
    })
    .map(request => {
        let dates = JSON.parse(request.dates);
        return [
            dates.first.day,
            dates.second && dates.second.day !== undefined && dates.second.day !== "" ? dates.second.day : undefined,
            dates.third && dates.third.day !== undefined && dates.third.day !== "" ? dates.third.day : undefined
        ];
    })
    .flat() // Flatten the array of arrays into a single array
    .filter(day => day !== undefined && day !== ""); // Flatten the array of arrays into a single array
    setpendingv((pend_enum.length) + (pend_cnum.length));
    console.log(lookhere,pend_enum )
    console.log(pend_e.length + pend_c.length, pendingv,pend_enum.length,pend_cnum.length);
    };pendingVfetcher();

},[requests])
    // Fetch student's vacation requests
    
    useEffect(() => {
        const fetchStudentRequests = async () => {
            try {
                const responseC = await axios.get('https://001-ochre-five.vercel.app/api/sheets/student-requests', {
                    params: { scode }
                });
                console.log('Requests:', responseC.data.requests);
                setRequests(responseC.data.requests);
            } catch (error) {
                console.error('Error fetching student requests:', error);
            }
        };
    
        fetchStudentRequests();
    }, [scode]);


    const pendingRequests_C = Array.isArray(requests) ? requests.filter(req => req.status === 'Pending' && (req.type === 'C' || req.type === 'HC') ) : [];

    const pendingRequests_E = Array.isArray(requests) ? requests.filter(req => req.status === 'Pending' && (req.type === 'E' || req.type === 'HE')) : [];

    return (
        <>
            <div>
                <table className='r_table'>
                    <caption>طلبات العوارض</caption>
                    <thead>
                        <tr>
                            <th>حالة الطلب</th>
                            <th>الأيام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr><td>لا يوجد</td><td>لا يوجد</td></tr>
                        ) : (
                            pendingRequests_E.map((req, index) => (
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
                <table className='r_table'>
                    <caption>طلبات الاعتيادي</caption>
                    <thead>
                        <tr>
                            <th>حالة الطلب</th>
                            <th>الأيام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr><td>لا يوجد</td><td>لا يوجد</td></tr>
                        ) : (
                            pendingRequests_C.map((req, index) => (
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNotificationStatus } from '../services/HttpClient';

export const VerificationPage = () => {
    const { requestId } = useParams(); // Get requestId from URL
    const [status, setStatus] = useState("Awaiting response...");

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await getNotificationStatus(requestId);
                console.log('API Response:', response); // Log the response

                if (response && response.success) {
                    // Update status based on response
                    if (response.data.isAccepted) {
                        setStatus("Verification accepted.");
                        clearInterval(intervalId); // Stop polling
                    } else if (response.data.isDeclined) {
                        setStatus("Verification declined.");
                        clearInterval(intervalId); // Stop polling
                    }
                }
            } catch (error) {
                console.error("Error fetching notification status:", error);
            }
        };

        // Fetch status immediately
        fetchStatus();

        // Polling for status updates every 5 seconds
        const intervalId = setInterval(fetchStatus, 5000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [requestId]);

    return (
        <div className='pageWrapper'>
            <h2>Verification Status</h2>
            <p>{status}</p>
        </div>
    );
};
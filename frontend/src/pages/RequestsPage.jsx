import React, { useEffect, useState } from 'react'
import { getRequests } from '../services/HttpClient';
import { Link } from 'react-router-dom';

export const RequestsPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
        try {
            const response = await getRequests();
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
        };

        fetchRequests();
  }, []);

  return (
    <div className='pageWrapper'>
      <h1>Requests</h1>
        {requests.map((request, index) => (
            <div className='requests-div' key={request._id}>
                <p>#{index + 1} - Request Id: {request._id}</p>
                <p>Transaction Hash: {request.transactionHash || "Pending"}</p>
                <p>{request.message}</p>
                <p>User: {request.user}</p>
                <Link to={`/requests/${request._id}`}>
                Log in as user to show data
                </Link>
            </div>  
        ))}


    </div>
  )
}

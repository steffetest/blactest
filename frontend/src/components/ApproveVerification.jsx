import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import { approveLicenseVerification, declineLicenseVerification } from '../services/HttpClient';

const ApproveVerification = () => {
  const { requestId } = useParams();  // Get requestId from URL parameters
  const location = useLocation();  // Get location object
  const notification = location.state?.notification; // Access notification from state
  const [statusMessage, setStatusMessage] = useState("");

  const handleAccept = async () => {
    try {
      const response = await approveLicenseVerification(requestId);  // Pass requestId here
      setStatusMessage(response.message);
    } catch (error) {
      setStatusMessage("An error occurred during approval.");
    }
  };

  const handleDecline = async () => {
    try {
      const response = await declineLicenseVerification(requestId);  // Pass requestId here
      setStatusMessage(response.message);
    } catch (error) {
      setStatusMessage("An error occurred during approval.");
    }
  };

  return (
    <div className='pageWrapper'>
      <h2>{notification?.message}</h2>
      <button onClick={handleAccept}>Accept Verification</button>
      <button onClick={handleDecline}>Decline Verification</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ApproveVerification;
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import { approveLicenseVerification, declineLicenseVerification } from '../services/HttpClient';
import { getVerificationStatus, recordVerification } from '../services/BlockchainServices';

const ApproveVerification = () => {
  const { requestId } = useParams();  // Get requestId from URL parameters
  const location = useLocation();  // Get location object
  const notification = location.state?.notification; // Access notification from state
  const [statusMessage, setStatusMessage] = useState("");

  const handleAccept = async () => {
    try {
      // Send additional license details in the request
      const response = await approveLicenseVerification(requestId, {
        lastName: notification.lastName,
        licenseType: notification.licenseType
      });
      
      setStatusMessage(response.message);
    } catch (error) {
      setStatusMessage(error.response?.data?.error || "An error occurred during approval.");
    }
  };

  const handleDecline = async () => {
    try {
      const response = await declineLicenseVerification(requestId);  // Pass requestId here
      setStatusMessage(response.message);
    } catch (error) {
      setStatusMessage(error.response?.data?.error || "An error occurred during approval.");
    }
  };

  const handleVerification = async () => {
    try {
        const response = await recordVerification({
            requestId,
            userAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            licenseType: notification.licenseType,
            isVerified: true
        });
        
        setStatusMessage(`Verification recorded successfully. Transaction Hash: ${response.data.transactionHash}`);
    } catch (error) {
      // Check if the error contains the response structure
      if (error.response && error.response.data && error.response.data.error) {
          const fullErrorMessage = error.response.data.error;

          // Use regex to extract the specific revert reason
          const reasonMatch = fullErrorMessage.match(/reason="(.+?)"/);
          if (reasonMatch && reasonMatch[1]) {
              setStatusMessage(`Verification failed: ${reasonMatch[1]}`);
          } else {
              setStatusMessage("Verification failed: Unknown error.");
          }
      } else {
          setStatusMessage("Verification failed: Unknown error.");
      }
  }
};

const checkStatus = async () => {
  try {
      // Fetch data and log for debugging
      const response = await getVerificationStatus(requestId);

      // Access values directly from the response object
      const isVerified = response.isVerified;
      const licenseType = response.licenseType;
      const timestamp = new Date(Number(response.timestamp) * 1000);
      const userAddress  = response.userAddress ;
      const transactionHash = response.transactionHash || "Pending";

      const formattedDate = timestamp.toLocaleString();

      // Set a simplified status message without timestamp and user address if they are unavailable
      setStatusMessage(`
          Status: ${isVerified ? "Verified" : "Not Verified"}
          License Type: ${licenseType}
          Timestamp: ${formattedDate}
          User Address: ${userAddress}
          Transaction Hash: ${transactionHash}
      `);
  } catch (error) {
      console.error("Error fetching verification status:", error);
      setStatusMessage("Failed to retrieve verification status.");
  }
};

  return (
    <div className='pageWrapper'>
      <h2>{notification?.message}</h2>
      <button onClick={handleAccept}>Accept Verification</button>
      <button onClick={handleDecline}>Decline Verification</button>
      <button onClick={handleVerification}>Record Verification on Blockchain</button>
      <button onClick={checkStatus}>Check Verification Status on Blockchain</button>
      {statusMessage && <p className='statusmessage'>{statusMessage}</p>}
    </div>
  );
};

export default ApproveVerification;
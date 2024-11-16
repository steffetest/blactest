import axios from "axios";

export const recordVerification = async ({requestId, userAddress, licenseType, isVerified}) => {
    const registerData = {requestId, userAddress, licenseType, isVerified};
    const token = localStorage.getItem("token");

    return await axios.post(
        `http://localhost:5001/api/v1/verify/record-verification`, 
        registerData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getVerificationStatus = async (requestId) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/verify/verification-status/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching verification status:", error);
      throw error;
    }
};
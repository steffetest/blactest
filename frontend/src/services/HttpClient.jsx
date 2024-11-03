import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/v1/auth/login",
      { email, password },
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const register = async (name, email, password) => {
  const registerData = {name, email, password};

  const response = await axios.post(
    'http://localhost:5001/api/v1/auth/register',
    registerData
  );

  return response.data;
};

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    'http://localhost:5001/api/v1/auth/me',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const addDriversLicense = async (lastName, name, birthdate, licenseType) => {
  const registerData = {lastName, name, birthdate, licenseType};
  const token = localStorage.getItem("token");

  const response = await axios.post(
    'http://localhost:5001/api/v1/licenses/addDriversLicense',
    registerData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

  return response.data;
};

export const verifyDriverLicense = async ({ lastName, name, licenseType }) => {
  const response = await axios.post(
      'http://localhost:5001/api/v1/verify',
      { lastName, name, licenseType }
  );
  
  return response.data;
};

export const approveLicenseVerification = async (requestId, { lastName, licenseType }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:5001/api/v1/verify/approve/${requestId}`,
      { lastName, licenseType },  // Send data in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Approval request error:", error.response || error);
    throw error;
  }
};

export const declineLicenseVerification = async (requestId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:5001/api/v1/verify/decline/${requestId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    console.log("Decline response:", response);  // Log response to verify it's successful
    return response.data;
  } catch (error) {
    console.error("Decline request error:", error.response || error);  // Log detailed error response
    throw error;  // Propagate error to the calling function
  }
};

export const getNotifications = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    'http://localhost:5001/api/v1/notifications',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

  return response.data;
};

export const getNotificationStatus = async (requestId) => {
  try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/notifications/${requestId}`
      );

      return response.data;
  } catch (error) {
      console.error('Error fetching notification status:', error);
      throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `http://localhost:5001/api/v1/notifications/${notificationId}/read`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

  return response.data;
};
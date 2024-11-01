import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../services/HttpClient';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className='pageWrapper'>
      <h2>Your Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <Link to={`/approve/${notification._id}`} state={{ notification }}>
              Approve/Decline Verification
            </Link>
            {/* <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications
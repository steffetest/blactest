import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../services/HttpClient';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();

        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
        
        setNotifications(sortedNotifications);
        setFilteredNotifications(sortedNotifications);
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
    <div className='container'>
      <h2>Your Notifications</h2>

        {filteredNotifications.map((notification, index) => (
          <div className='card' key={notification._id}>
            <div className='card-header'>#{filteredNotifications.length - index} - Id: {notification._id}</div>
            <div className='card-body'>
              <p>Created at: {new Date(notification.createdAt).toLocaleString()}</p>
              <p>{notification.message}</p>
              <p>Status: {notification.status}</p>
              <Link to={`/approve/${notification._id}`} state={{ notification }}>
                Approve/Decline Verification
              </Link>
              {/* <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notifications
import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../services/HttpClient';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Menu = () => {
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await getUserDetails();
          setUserName(response.data.name)
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }

      fetchUserData();
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");

      toast.success("You are now logged out!")

      navigate("/");
    };

  return (
    <div className='pageWrapper'>

      <div className='menuHeaderAndLogoutWrapper'>
        <h1>Welcome {userName}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <NavLink to="/addlicense">
        <button>Add Licenses</button>
      </NavLink>

      <NavLink to="/licenses">
        <button>View Licenses</button>
      </NavLink>

      <NavLink to="/notifications">
        <button>View Notifications</button>
      </NavLink>

      <NavLink to="/verification">
        <button>Go to Verification</button>
      </NavLink>
    </div>
  )
}

export default Menu

import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/menu")
    }
  }, [token, navigate]);

  return (
    <div className='home'>
      <NavLink to="/login">
        <button>Log in</button>
      </NavLink>
      <NavLink to="/register">
        <button>Sign up</button>
      </NavLink>
      <NavLink to="/verification">
        <button>Verification</button>
      </NavLink>
      <NavLink to="/requests">
        <button>Requests</button>
      </NavLink>
    </div>
  )
}

export default Home

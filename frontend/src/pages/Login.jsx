import React, { useState } from 'react';
import { login } from "../services/HttpClient";
import { useLocation, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState("stefan@mail.com");
    const [password, setPassword] = useState("1234");

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await login(email, password);

          localStorage.setItem("token", response.token);

          const returnTo = location.state?.returnTo || "/menu";  // Redirect to intended page or default menu page
          
          navigate(returnTo);
        } catch (error) {
          console.error(error);
          window.alert("There was an error while logging in, please try again.");
        }
      };

  return (
    <div className="pageWrapper">
      <form className="forms" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

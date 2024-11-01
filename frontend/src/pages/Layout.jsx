import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {navigate('/menu')};
        
    // }, [navigate]);

  return (
    <>
        <main className='blackbox-container'>
          <NavLink to={"/"}>
            <h1 className="logo">Blackbox</h1>
          </NavLink>
          <Outlet />
        </main>
    </>
  );
};
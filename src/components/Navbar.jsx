import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logoutFunc = ()=>{
    localStorage.removeItem("yoga_user");
    navigate("/");
  }
  return (
    <nav id='navbar'>
        <div id="logo">YoGa</div>
        <div to="/" className="btn" style={{marginRight:50}} onClick={logoutFunc}>Logout</div>
    </nav>
  )
}

export default Navbar
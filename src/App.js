import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Enroll from './components/Enroll';

import './App.css';

function App() {
  // const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log("here");
    const userExist = localStorage.getItem("yoga_user");
    if(userExist){
      setUserData(JSON.parse(userExist));
      // navigate("/dashboard");
    }
  }, [userData])
  
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData} />} />
        <Route path="/dashboard" element={<Home userData={userData} />} />
        <Route path="/enroll" element={<Enroll userData={userData} setUserData={setUserData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles.css"
import { server_base_url } from '../info'
const Login = ({setUserData}) => {
  const navigate = useNavigate();
  const [phoneNo, setPhoneNo] = useState("")
  const loginFunc = async()=>{
    console.log(server_base_url);
    const res = await fetch(`${server_base_url}/api/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({phoneNo})
    });
    if(res.status==200){
      const data = await res.json();
      setUserData(data.data);
      localStorage.setItem("yoga_user",JSON.stringify(data.data));
      navigate("/dashboard");
    }
  }
  useEffect(() => {
    const userExist = localStorage.getItem("yoga_user");
    if(userExist){
      setUserData(JSON.parse(userExist));
      navigate("/dashboard");
    }
  }, [])
  
  return (
    <div id='loginPage'>
        <div className="form">
            <input onChange={(e)=>{setPhoneNo(e.target.value)}} type="text" maxlength="10" placeholder='Enter Phone Number' />
            <button id='loginBtn' onClick={loginFunc}>Login</button>
        </div>
    </div>
  )
}

export default Login
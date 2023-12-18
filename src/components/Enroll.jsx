import React,{ useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { server_base_url } from "../info";

const Enroll = ({userData,setUserData}) => {
    const navigate = useNavigate();

    const phoneNo = userData.phoneNo;
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("6-7AM");
    const [cardNo, setCardNo] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");


    const [userInfoDisplay, setUserInfoDisplay] = useState("flex");
    const [cardInfoDisplay, setCardInfoDisplay] = useState("none");

    

    const handleInput = (e)=>{
        const name = e.target.name;
        const val = e.target.value;
        if(name=="name"){
            setName(val);
        }else if(name=="age"){
            setAge(val);
        }else if(name=="cardNo"){
            setCardNo(val);
        }else if(name=="expiry"){
            setExpiry(val);
        }else if(name=="cvv"){
            setCvv(val);
        }else{
            setBatch(val);
        }
    }

    const moveToPayment = ()=>{
        if(age<18 || age>65){
            alert("your age should be in range 18-65");
        }else{
            setUserInfoDisplay("none");
            setCardInfoDisplay("flex");
        }
    }

    const continuePayment = async ()=>{
        const date = new Date;
        const month = date.getUTCMonth();
        const year = date.getFullYear();
        const monthYear = month + " " + year;
        const res = await fetch(`${server_base_url}/api/enroll`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({phoneNo,name,age,batch,cardNo,expiry,cvv,monthYear})
        });
        if(res.status==200){
          const data = await res.json();
          setUserData(data.data);
          localStorage.setItem("yoga_user",JSON.stringify(data.data));
          navigate("/dashboard");
        }
    }

    useEffect(() => {
        if(!userData.phoneNo){
            navigate("/");
          }
    }, [])
    

  return (
    <div>
        <Navbar />
        <div id='enrollPage'>
            <div className="userInfo" style={{display:userInfoDisplay}}>
                <input onChange={handleInput} name="name" type="text" placeholder='Full Name' />
                <input onChange={handleInput} name="age" type="number" placeholder='age' />
                <select onChange={handleInput} name="batch" id="batch">
                    <option value="6-7AM">6-7 AM</option>
                    <option value="7-8AM">7-8 AM</option>
                    <option value="8-9AM">8-9 AM</option>
                    <option value="5-6PM">5-6 PM</option>
                </select>
                <div className="btn" onClick={moveToPayment}>Ready to Pay</div>
            </div>
            <div className="cardInfo" style={{display:cardInfoDisplay}}>
                <input onChange={handleInput} name="cardNo" type="text" placeholder="Debit card Number" />
                <input onChange={handleInput} name="expiry" type="text" placeholder="Expiry eg. 07/23" />
                <input onChange={handleInput} name="cvv" type="text" placeholder="CVV eg. 213" />
                <div className="d-flex flex-row w-100" style={{justifyContent:"space-around"}}>
                    <div className="btn" onClick={continuePayment}>Pay It</div>
                    <div className="btn" onClick={()=>{setUserInfoDisplay("flex");setCardInfoDisplay("none")}}>Cancel</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Enroll

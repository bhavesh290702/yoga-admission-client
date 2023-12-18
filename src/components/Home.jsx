import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = ({userData}) => {
  const [enrolledThisMonth, setenrolledThisMonth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(!userData.phoneNo){
      navigate("/");
    }
    const date = new Date;
    const month = date.getUTCMonth();
    const year = date.getFullYear();
    const monthYear = month + " " + year;
    const userLastDate = userData.monthYear;
    if(!userLastDate || userLastDate!=monthYear){
      setenrolledThisMonth(false);
    }else{
      setenrolledThisMonth(true);
    }
  }, [userData])
  
  return (
    <div id='homePage'>
        <Navbar />
        {!enrolledThisMonth
        ?<div className="text">
            Yoh have not enrolled in any of the batch this month
            <br /><br />
            Enroll fast at 500/- per month
        </div>
        :<div className="text">
            The timing of your batch is {userData.batch}
          </div>
        }
        
        <br />
        {!enrolledThisMonth &&  <Link to="/enroll" className="btn">
        Enroll Now
        </Link>}
       
    </div>
  )
}

export default Home
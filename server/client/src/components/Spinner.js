import React from "react";
import { useEffect ,useState} from "react";
import { useNavigate ,useLocation} from "react-router-dom";
function Spinner({path="login"}) {
    const [count,setCount]=useState(1)
    const navigate=useNavigate()
    const location=useLocation()
    useEffect(()=>{
        const interval=setInterval(()=>{
          setCount((prevValue) => --prevValue)
        },1000)
        count===0 && navigate(`/${path}`,{
            state:location.pathname,
        })
    return()=> clearInterval(interval)
    },[count,navigate,location])
  return (
    <>
      <div
        className="d-flex flex-cloum justify-content-center align-items-center"
        style={{ height: "100vh"}}
      >
       
        {/* <h3 className="text-center">redirecting to you in {count} seconds</h3> */}
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
         
        </div> 
       
      </div>
      
    </>
  );
}

export default Spinner;

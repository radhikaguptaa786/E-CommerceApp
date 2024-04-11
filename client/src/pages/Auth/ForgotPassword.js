import {React,useState} from 'react'

import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword=() =>{
    const [email,setEmail]=useState("");
    const [newpassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();
    // handleSubmit
    const handleSubmit= async (event)=>{
        event.preventDefault();
        try {
            const res_API = await axios.post("/api/v1/auth/forgot-password", {
              email,
              answer,
              newpassword,
            });
            if (res_API && res_API.data.success) {
              toast.success(res_API.data.message);
              console.log("Password Reset successfully");
             
              navigate("/login");
            } else {
              toast.error(res_API.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
    }
  return (
    <Layout title={"Login- ECommerce"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Reset Password</h1>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="Email"
              placeholder="abc@gmail.com"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <input type="text" value={answer} 
             onChange={(event)=>
                setAnswer(event.target.value)
            }
            className="form-control" id="answer" placeholder='your nickname' required/>
        </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newpassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="form-control"
              id="newPassword"
              required
            />
          </div>
          <ul className='nav-link text-center ' style={{listStyle:'none'}}>
            <li>
                <button type="submit" className="btn btn-primary align-item-center m-3">
                Reset
              </button>
              <Link to='/login'>
              <button type="btn" className="btn btn-primary align-item-center" >
                Go Back
              </button>
              </Link>
              </li>
          </ul>
          
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword

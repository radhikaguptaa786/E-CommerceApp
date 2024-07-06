import { React, useState } from "react";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import {  useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location=useLocation();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res_API = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res_API && res_API.data.success) {
        toast.success(res_API.data.message);
        console.log("Login successfully");
        setAuth({
          ...auth,
          user: res_API.data.user,
          token: res_API.data.token,
        });
        //save data in localstorage
        localStorage.setItem("auth", JSON.stringify(res_API.data));
        // sessionStorage.setItem("auth", JSON.stringify(res_API.data));
        navigate(location.state||"/home");
      } else {
        toast.error(res_API.data.message);
        console.log("something wrong in Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Login- ECommerce"}>
      <div className="form-container mt-3 ">
        <form onSubmit={handleSubmit} className="bg-info bg-opacity-10">
          <h1 className="title">Login Form</h1>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
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
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              id="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary align-item-center">
            Login
          </button>
          <div className="mb-3 text-center">
          <Link to='/forgot-password'>Forgot Password</Link>
          </div>
          <div className="mb-3 text-center">
            <p>Do not have an account? 
          <Link to='/register'>SignUp</Link>
          </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Login;

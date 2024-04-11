import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layout/Layout.js";
import {  useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/AuthStyles.css";
import buyNow from './buyNow.jpg'
function Header() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location=useLocation();

  // for login handlesubmit
  const LoginHandleSubmit = async (event) => {
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
        navigate(location.state||"/");
      } else {
        toast.error(res_API.data.message);
        console.log("something wrong in Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <img src={buyNow}></img>
          <Link to="/" className="navbar-brand" style={{color:'white'}}>
            Buy Now
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/modeltest" className="nav-link">
                  Category
                </NavLink>
              </li>
              { auth?.user?.role===0 ?(
                 <li className="nav-item">
                 <NavLink to="/cart" className="nav-link">
                   Cart{0}
                 </NavLink>
               </li>
              ):(
                <></>
              )
              }
              {!auth.user ? (
                <>
                 <div>
                 <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#LoginModal"
                  >Register
                      </button>
                  
                  <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#LoginModal"
                  >
                        Login
                      </button>
                 </div>
                      <div className="Login">
                        <div
                          className="modal fade"
                          id="LoginModal"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                        <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="title fs-10 text-center" id="ModalLabel">
                            Login
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body ">
                          <form onSubmit={LoginHandleSubmit}>
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
                      <div className="">
                    <Link to='/forgot-password'>Forgot Password</Link>
                    </div>
                    </div>
                   <div className="d-grid gap-2">
                      <button className="btn btn-primary" type="submit">Login</button>
                    </div>

                    
                    <div className="mb-3 text-center">
                      <p>Do not have an account? 
                    <Link to='/register'>SignUp</Link>
                    </p>
                    </div>
                  </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle "
                      type="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      {auth.user.name}
                    </button>
                    <ul className="dropdown-menu ">
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="dropdown-item" to="/" >Change Password
                          </NavLink>
                         
                      </li>
                     
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item link-success">
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          
                          className="nav-link link-success"
                        >
                          LOGOUT
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

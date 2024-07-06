import { React, useState } from "react";

import Layout from "../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  // handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res_API = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res_API && res_API.data.success) {
        toast.success(res_API.data.message);
        console.log("submit successfully");
        navigate("/login");
      } else {
        toast.error(res_API.data.message);
        console.log("something wrong in submit");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Register- ECommerce"}>
      <div className="form-body">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="bg-info bg-opacity-10">
            <h1 className="title">Register Yourself</h1>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name :{" "}
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-control"
                id="Name"
                placeholder="Eg.- ABC"
                maxLength={50}
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">
                Phone
              </label>
              <input
                type="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="form-control"
                id="Phone"
                placeholder="000000000"
                maxLength={10}
                minLength={10}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="form-control"
                id="Address"
                placeholder="District,State,Country"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                className="form-control"
                id="answer"
                placeholder="your nickname"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <div className="mb-3 text-center">
              <p>
                Already have an account ?
                {/* <Link data-bs-toggle="modal" data-bs-target="#LoginModal">
                  SignIn
                </Link> */}
                <Link to='/login'>SignIn</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;

import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // context
  const [auth,setAuth]=useAuth()
  //get user data
  useEffect(()=>{
    const {email,name,phone,address,password}=auth?.user 
    setName(name)
    setAddress(address)
    setEmail(email)
    setPassword(password)
    setPhone(phone)
  },[auth?.user])
  // form function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
     if(data?.error){
      toast.error(data.error)
     }else{
      setAuth({...auth,user:data?.updatedUser})
      let localSt=localStorage.getItem("auth")
      localSt=JSON.parse(localSt)
      localSt.user=data.updatedUser
      localStorage.setItem('auth',JSON.stringify(localSt))
      toast.success("Profile updated successfully")
     }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
    <Layout title={'UserProfile'}>
    <div className='container-fluid m-3 p-3'>
          <div className='row'>
           <div className='col-md-3'>
             <UserMenu/>
           </div>
           <div className='col-md-6' >
           <div className="form-body">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1 className="title">User Profile</h1>
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
                required disabled
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
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            
          </form>
        </div>
      </div>
           </div>
          </div>
       </div>
       </Layout>
     
   </>
  )
}

export default Profile

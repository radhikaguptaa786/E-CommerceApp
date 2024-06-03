import React from 'react'
import Layout from '../components/Layout/Layout'
import { IoCall } from "react-icons/io5";
import { FaMailBulk } from "react-icons/fa";
function Contact() {
  return (
    <Layout title={"Contact Us- ECommerce App"}>
        <div className='contact-container p-3'>
              <div className="container text-center">
                <div className="row">
                  <div className="col-8 border bg-info bg-opacity-10 rounded-end ">
                    <form className="row g-3">
                      <h4>Contact Us</h4><br/>
                      <div className='row'>
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" />
                      </div>
                      <div className='row'>
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                      </div>
                    <div className="col-12">
                      <label htmlFor="inputAddress" className="form-label">Address</label>
                      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">City</label>
                      <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputState" className="form-label">State</label>
                      <select id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputZip" className="form-label">Zip</label>
                      <input type="text" className="form-control" id="inputZip" />
                    </div>
                    
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">submit</button>
                    </div>
                  </form>


                  </div>
                    <div className="col-4">
                      <div className='row'>
                        <img src='/images/contact2.jpg' height={200} ></img>
                      </div> 
                      <div className='row'>
                      <div className="col-1"><h5 className='mt-3 text-left' ><IoCall /> </h5> </div>
                      <div className="col-6"><h5 className='mt-3 text-left' > 91-999999999</h5></div>
                      </div> 
                      <div className='row'>
                      <div className="col-1"><h5 className='mt-3 text-left' ><FaMailBulk /> </h5> </div>
                      <div className="col-6"><h5 className='mt-3 text-left' >bookBazzar@test.com</h5></div>
                      </div> 
                      
                  </div>
                </div>
             </div>

        </div>
    </Layout>
  )
}

export default Contact

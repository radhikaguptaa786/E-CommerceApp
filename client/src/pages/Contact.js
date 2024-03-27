import React from 'react'
import Layout from '../components/Layout/Layout'
import { IoCall } from "react-icons/io5";
import { FaMailBulk } from "react-icons/fa";
function Contact() {
  return (
    <Layout>
        <div className='contact-container'>
            <div className='contact-row1'>
                <img src='/images/contact.jpg' width={1100} height={300}></img>
            </div>
            <div className='contact-details'>
                <p className='mt-3'><IoCall /> 91- 999999999</p>
                <p className='mt-3'><FaMailBulk /> test@test.com</p>
                <p><IoCall /> 91- 999999999</p>
            </div>
        </div>
    </Layout>
  )
}

export default Contact

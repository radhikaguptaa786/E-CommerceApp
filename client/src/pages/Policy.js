import React from 'react'
import Layout from '../components/Layout/Layout'

function Policy() {
  return (
    <Layout title={"Privacy Policy"}>
         <div className='contact-container'>
            <div className='contact-row1'>
                <img src='/images/contact.jpg' width={1100} height={300}></img>
            </div>
            <div className='contact-details'>
                <p className='mt-3'>91- 999999999</p>
                <p className='mt-3'> test@test.com</p>
                <p>91- 999999999</p>
            </div>
        </div>
    </Layout>
  )
}

export default Policy

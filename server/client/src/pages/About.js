import React from 'react'
import Layout from '../components/Layout/Layout'

function About() {
  return (
    <Layout title={'About US'}>
         <div className='contact-container  bg-info bg-opacity-10'>
          <div className='contact-row1 row'>
          <img src='/images/about.jpg'  height={201}></img>
          <h3 className='mt-2 text-center bg-info bg-opacity-10' >About BookBazaar</h3>
            <div className='contact-details col-md-12'>
                <p className='mt-3 card p-3 border-info'> Dear readers,
                  <br/>
                We offer a huge collection of books from diverse categories of Fiction, Non-fiction, Biographies, History, Religion, Self-Help, etc. We also offer a collection of Investments and Management, Computers, Engineering, Medical, College and School text reference books.
                We strive for customer satisfaction by offering a user-friendly search engine, efficient payment options and seamless delivery systems. Apart from all this, we also provide great deals and discounts on our products.
                All the Publishers, Distributors and Authors around the country are welcome to partner with us and grow the BookBazaar family. We would like to thank our customers for shopping with us. You can write to us on our e-mail id to share any suggestions or feedback you might have regarding our website or services.</p>
            </div>
          </div>
          
        </div>
    </Layout>
  )
}

export default About

import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <h4 className='text-center' >All Rights Reserved &copy; Radhika</h4>
      <p className='text-center mt-1'>
        <Link to="/about">About</Link> |
        <Link to="/contact">Contact</Link> |
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer

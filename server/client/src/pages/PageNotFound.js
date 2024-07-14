import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { PiSmileySadLight } from "react-icons/pi";
import oops from './images/oops_back.png'
function PageNotFound() {
  return (
   <Layout title={"PageNotFound"}>
        <div className='card' >
           {/* <h1 className='pnf-title'>404</h1>
           <PiSmileySadLight /> */}
            
           <img src={oops} alt='OOPS!' className='card-img' style={{height:'79vh'}}></img>
           {/* <h2 className='pnf-heading'>OOPs! Page Not Found</h2> */}
           <Link to="/" className=' card-img-overlay '>Go Back</Link>
           <Link to="/" className=' pnf-btn card-img '>Go Back</Link>
        </div>
   </Layout>
  )
}

export default PageNotFound

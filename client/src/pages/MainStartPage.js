import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import books from './images/Books.jpg'
import books3 from './images/Books3.jpg'
import nextread from './images/NextRead.jpg'
const MainStartPage = () => {
  const navigate=useNavigate()
  
  

  return (
    <Layout title={"Home"}>
        <div className='card' >
           {/* <h1 className='pnf-title'>404</h1>
           <PiSmileySadLight /> */}
            <img src={nextread} alt='nextRead!' className='card-img' style={{height:'10vh'}}></img>
           {/* <img src={books} alt='BOOKS!' className='card-img' style={{height:'79vh'}}></img> */}
           <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={4000}>
    <img src={books} alt='BOOKS!' className='card-img' style={{height:'75vh'}}></img>
    </div>
    <div className="carousel-item" data-bs-interval={3000}>
    <img src={books3} alt='BOOKS!' className='card-img' style={{height:'75vh'}}></img>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
           {/* <h2 className='pnf-heading'>OOPs! Page Not Found</h2> */}
           <Link to="/home" className=' card-img-overlay '></Link>
           <Link to="/home" className=' pnf-btn card-img '>Explore</Link>
        </div>
   </Layout>
  );
};

export default MainStartPage;

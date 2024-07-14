import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import books from './images/Books.jpg'
import books3 from './images/Books3.jpg'
import nextread from './images/NextRead.jpg'
import booksMain from "./images/BooksMain.jpg"
const MainStartPage = () => {
  const navigate=useNavigate()
  
  

  return (
    <Layout title={"Home"}>
      <div>
      {/* <img src={nextread} alt='nextRead!' className='card-img placeholder-glow' style={{height:'10vh'}}></img> */}
            <div className="card mt-3"  style={{border:'none'}} >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="card m-5" style={{ border:'none'}}>
              <div className="card-body">
                <h1 className="card-title" style={{fontWeight:'bolder'}}>Welcome to BookBazaar </h1>
                <p className="card-text">where every book has a story to tell! Our shelves are stocked with a carefully curated selection of books from all genres, ensuring that every reader finds their perfect match. Whether you’re a lifelong bibliophile or just beginning your reading journey, our knowledgeable staff is here to help you discover new favorites. Visit us in-store or explore our collection online. Happy reading!
                </p>
                <Link to={'/home'} className="btn btn-primary  " style={{width:'10rem'}}>Explore</Link>
              </div>
            </div>

          </div>
          <div className="col-md-4">
            <div className="card-body">
            <img src={booksMain}  alt="book image"  style={{margin:'auto',width:'25rem'}} />
            </div>
          </div>
        </div>
      </div>
      </div>

   </Layout>
  );
};

export default MainStartPage;

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart,setCart]=useCart();
  
  const { auth } = useAuth();
  const userdata = localStorage.getItem("auth");
  console.log(auth)
  // initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error, "similar Product error");
    }
  };
  const AddtoCart = async (product) => {
    try {
      const userdata = localStorage.getItem("auth");
      if(userdata){
      console.log(JSON.parse(userdata));
      const User=JSON.parse(userdata)
      const payload = {
        product: product,
        user: User
      };
      const { data } = await axios.post("/api/addto-cart", payload);
      setCart([...cart, data]);
      toast.success("Item added to cart");
    }
    else{
      navigate('/login')
    }
    } catch (error) {
      console.log(error);
      toast.error("Book Cannot be added to Cart");
    }
  };
  return (
    <Layout>
      <div className="card m-5">
      <div className="row container mt-2 ">
        <div className="col-3 ">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            height={"300"}
          ></img>
        </div>
        <div className="col-7 ">
          <h1 className="text-center"><h5>{product.name}</h5></h1>
          <h4>Book Details</h4>
          <div className="row">
             <div className="col-2"><h6>Author:</h6></div>
             <div className="col-6"><h6>{product.author?product.author:" "}</h6></div>
          </div>
          <div className="row">
             <div className="col-2"><h6>No. of Pages:</h6></div>
             <div className="col-6"><h6>{product.pagenumbers?product.pagenumbers:" "}</h6></div>
          </div>
          <div className="row">
             <div className="col-2"><h6>Binding:</h6></div>
             <div className="col-6"><h6>{product.binding?product.binding:" "}</h6></div>
          </div>
          {/* <div className="row">
             <div className="col-2"><h6>ISBN No.:</h6></div>
             <div className="col-6"><h6>{product.name}</h6></div>
          </div>
          <div className="row">
             <div className="col-2"><h6>Publishers:</h6></div>
             <div className="col-6"><h6>{product.name}</h6></div>
          </div>
          <div className="row">
             <div className="col-2"><h6>Publish Date:</h6></div>
             <div className="col-6"><h6>{product.name}</h6></div>
          </div> */}
          <div className="row">
             <div className="col-2"><h6>Returnable:</h6></div>
             <div className="col-6"><h6>{product.returnable?product.returnable:" "}</h6></div>
          </div>
          <h5 className="card-price">Price:${product.price}</h5>
          <div className="accordion accordion-flush" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" >
                  About the Book
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <h6>Description:{product.description}</h6>
                </div>
              </div>
            </div>
          </div>
          
          {/* <h6>Category:{product.category.name}</h6> */}
        </div>
        <div className="col-2"><div className="container text-center mt-3">
          <div className="card p-3 mt-5">
          <button
                    className="btn btn-warning btn-sm m-2"
                    onClick={()=>{
                      if(userdata)
                      {AddtoCart(product);}
                    else{
                      navigate('/login')
                    }}}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn green-btn btn-warning btn-sm m-2"
                  >
                    Buy Now
                  </button>
          </div>
      </div></div>
      </div>
      
        <div className="container text-center mt-3">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
           Premium Quality
          </div>
          
        </div>
      </div>

      </div>
      <div className="row container">
        <h4 className="mt-2">Similar Products</h4>
        {/* {JSON.stringify(relatedProducts,null,4)} */}
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "12rem"}}>
          
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name} height={"100px"}
              />
              <div className="card-body">
                <h6 className="card-title">{p.name}</h6>
                {/* <p className="card-text">{p.description.substring(0, 30)}...</p> */}
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-warning ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary mt-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

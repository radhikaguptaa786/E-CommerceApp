import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { useCart } from "../context/cart";
import nextread from "./images/NextRead.jpg";
import "../styles/Card.css";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // const [cart,setCart]=useCart();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {}
  };

  // get all products
  const getAllProducts = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log("cannot get products");
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by cate
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("api/v1/product/product-filter", {
        checked,
        radio,
      });

      setProducts(data.products);
      if (data.products.length === 0) {
        <>
          <h1>NO Products Available</h1>
        </>;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //add to cart
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
  // useEffect(()=>{
  //   if(auth?.token) AddtoCart()
  // },[auth?.token])

  return (
    <Layout title={"All Products- Best Offers"}>
      {/* banner image */}
      {/* <img
        src="/images/NextRead.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
       
      {/* banner image */}
      <div className="row ">
        <div className="col-md-2 ms-1 filter-col d-flex flex-column ">
          <h6 className="text-center">Filter By Category</h6>
          {categories?.map((c) => (
            <Checkbox
              className="filter"
              key={c._id}
              onChange={(event) => handleFilter(event.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
          {/* price filter */}
          <h6 className="text-center mt-4">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="filter">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-secondary btn-sm m-2 btn-delete"
              onClick={() => window.location.reload()}
            >
              {" "}
              Reset Filter
            </button>
          </div>
        </div>
        {/* {JSON.stringify(radio, null, 4)} */}
        <div className="col-md-9 m-auto">

          <h2 className="text-center text-bg-secondary mt-2">Find Your favorites</h2>
        {products&&products.length>=2 ? 
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
       
  <div className="carousel-inner " >
    <div className="carousel-item active">
      <img src={`/api/v1/product/product-photo/${products[Math.floor(Math.random()*products.length)]._id}`} className="d-block w-50 m-auto" alt={products[0].name}  style={{ objectFit: 'fill',
  objectPosition: 'center',
  overflow:' hidden',
  height:'50vh'}}/>
    </div>
    <div className="carousel-item">
      <img src={`/api/v1/product/product-photo/${products[Math.floor(Math.random()*products.length)]._id}`} className="d-block w-50 m-auto" alt={products[1].name} style={{ objectFit: 'fill',
  objectPosition: 'center',
  overflow:' hidden',
  height:'50vh'}} />
    </div>
    <div className="carousel-item">
      <img src={`/api/v1/product/product-photo/${products[Math.floor(Math.random()*products.length)]._id}`} className="d-block w-50 m-auto " alt={products[2].name} style={{ objectFit: 'fill',
  objectPosition: 'center',
  overflow:' hidden',
  height:'50vh'}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div> :<></>
}
         
          <div className="d-flex flex-wrap mt-5">
            {products && products.length > 0 ? (
              products.map((p) => (
                <div>
                <div
                  className="card m-2"
                  style={{ width: "16rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"150"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    {/* <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> */}
                    <p className="card-text card-price">Price: $ {p.price}</p>
                    <button
                      className="btn btn-secondary btn-sm ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-warning btn-sm ms-1"
                      // onClick={()=>{setCart([...cart,p]);
                      //   localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      //   toast.success("Item added to cart")}}
                      onClick={() => {
                        AddtoCart(p);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                
</div>
                
              ))
            ) : (
              <>
                <div className="shadow p-3 mb-5 bg-body-tertiary rounded center">
                  No Product Available
                </div>
              </>
            )}
          </div>
          <div className="m-2 p-3 ">
            <hr />
            {products && products.length < total && products.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

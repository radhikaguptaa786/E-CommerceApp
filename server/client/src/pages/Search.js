import Layout from '../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../context/search'
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [search,setSearch]=useSearch()
    const [cart,setCart]=useCart();
    const navigate=useNavigate()
  //  console.log(search);
  return (
    <>
     <Layout title='search-Results'>
        <div className='container'>
            <h3>Search Results </h3>
            <h5 >{(search && search.result.length<1)?'No Products Found':`Found ${search?.result.length}`}</h5>
            <div className="d-flex flex-wrap">
            
            {search?.result.map((p) =>(
              <div className="card m-2" style={{ width: "15rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name} height={'150'}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  {/* <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> */}
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn btn-secondary btn-sm ms-1"
                    onClick={()=>navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-info btn-sm ms-1"
                    onClick={()=>{setCart([...cart,p]);
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Item added to cart")}}
                  >
                    Add to Cart
                  </button>
                    </div>
                </div>
                ))}
            
          </div>
        </div>
    </Layout>
    </>
  )
}

export default Search

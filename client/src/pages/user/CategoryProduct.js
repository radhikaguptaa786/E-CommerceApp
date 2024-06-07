import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import toast from 'react-hot-toast'
import "../../styles/Card.css"
const CategoryProduct = () => {
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState([])
    const [cart,setCart]=useCart();
    const params=useParams();
    const navigate=useNavigate()
    useEffect(()=>{
        if(params?.slug) getProductsByCat()
    },[params?.slug])
    const getProductsByCat=async ()=>{
        try{
            const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Layout>
      <div className='container'>
        <h3 className='text-center'>{category?.name}</h3>
        <h4 className='text-center'>{products?.length} {products?.name} Found</h4>
        <div className="d-flex flex-wrap">
            
            {products&& products.length>0 ?(products.map((p) => (
              <div className="card m-2" style={{ width: "15rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name} height={'150'}
                />
                <div className="card-body" >
                  <div className='card-middle'>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text " height="150">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text card-price">Price: $ {p.price}</p>
                  </div>
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
            ))):(<>
                  <div className="shadow p-3 mb-5 bg-body-tertiary rounded center">No Product Available</div>

                  </>)}
            
          </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct

import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Orders = () => {
  const [orders,setOrders]=useState([])
const [auth,setAuth]=useAuth()
  const getOrders=async()=>{
    try{
      const {data}=await axios.get('/api/v1/auth/orders')
      setOrders(data)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <>
     <Layout title={'Orders'}>
     <div className='container-fluid m-3 p-3'>
           <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-6'>
                <h3 className='text-center'>All Orders</h3>
                {
                  orders?.map((order,index)=>{
                    return(
                      <div className='border shadow'>
                         <table className='table'>
                          <thead>
                            <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Buyer</th>
                              <th scope='col'>Date</th>
                              <th scope='col'>Payment</th>
                              <th scope='col'>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{index+1}</td>
                              <td>{order?.status}</td>
                              <td>{order?.buyer?.name}</td>
                              <td>{moment(order?.createdAt).fromNow()}</td>
                              <td>{order?.payment?.success?"Success":"Failed"}</td>
                              <td>{order?.products?.lengtd}</td>
                            </tr>
                          </tbody>
                         </table>
                         <div>
                         {order?.products?.map((p,index) => (
                             
                             <div className='row  d-flex flex-wrap mb-2 p-3 ' key={p._id}>
                              
                                 <div className='col-md-3'>
                                     <img src={`/api/v1/product/product-photo/${p._id}`}
                                         height={'100px'} 
                                         className='card-img-top' alt={p.name} />
                                 </div>
                                 <div className='col-md-9'>
                                     <h5><Link to={`/product/${p.slug}`} >{p.name}</Link></h5>
                                     
                                     <h5>Price: ${p.price}</h5>
                                  
                                 </div>
                                 </div>
                            
                         ))}
                         </div>
                      </div>
                    )
                  })
                }
            </div>
           </div>
        </div>
        </Layout>
      
    </>
  )
}

export default Orders

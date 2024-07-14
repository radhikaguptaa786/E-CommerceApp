import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useState ,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Select } from 'antd'
const {Option}=Select
const AdminOrders = () => {
    const [status,setStatus]=useState(["Not Process","Processing","Shipped","Deliever","Cancel"])
    const [changeStaus,setChangeStatus]=useState("")
        const [orders,setOrders]=useState([])
      const [auth,setAuth]=useAuth()
        const getOrders=async()=>{
          try{
            const {data}=await axios.get('/api/v1/auth/all-orders')
            setOrders(data)
          }catch(error){
            console.log(error);
          }
        }
    
        useEffect(()=>{
          if(auth?.token) getOrders()
        },[auth?.token])
const handleChange=async (orderId,value)=>{
    try{
        const {data}=await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value})
        getOrders();
    }catch(error){
        console.log(error)
    }
}
  return (
    <Layout title={"All Orders Data"}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>All Orders</h1>
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
                                  <td>
                                    <Select bordered={false} onChange={(value)=>handleChange(order._id,value)} defaultValue={order?.status}>
                                        {status.map((s,i)=>(
                                            <Option key={i} value={s}>{s}</Option>
                                        ))

                                        }
                                    </Select>
                                  </td>
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
    </Layout>
  )
}

export default AdminOrders

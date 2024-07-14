import React ,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Users = () => {
    const [users,setUsers]=useState();

    // get all products
    const getAllUsers=async()=>{
        try{
                const {data}=await axios.get('/api/v1/product/get-users');
                setUsers(data.users);
        }catch(error){
            console.log(error);
            toast.error("something went wrong in getting all Users")
        }
    }
    // lifecycle method
    useEffect(()=>{
        getAllUsers();
    },[])
  return (
    <Layout>
      <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
               <h1 className='text-center'>All Users List</h1> 
               <div className='d-flex  flex-wrap align-items-stretch overflow-auto'>
                {users?.map((p)=>(
                   <Link key={p._id} className='products-link'>
                        <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                       
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <h6>{p.role===1?'Admin':'user'}</h6>
                            </div>
                        </div>
                   </Link>
                ))}
               </div>
            </div>
      </div>
    </Layout>
  )
}

export default Users

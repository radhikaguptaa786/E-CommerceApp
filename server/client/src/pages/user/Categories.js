import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import useCategory from '../../hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
    const categories=useCategory()
  return (
    <Layout title={"All Categories"}>
        <div className='container'>
            <div className='row m-3 '>
                <div >
                    {categories.map(c=>(
                        <div className='card mt-2 mb-2 gx-3 gy-3 ' key={c._id} >
                        <Link to={"/"} className='btn btn-secondary ' >{c.name}</Link>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    </Layout>
  )
}

export default Categories

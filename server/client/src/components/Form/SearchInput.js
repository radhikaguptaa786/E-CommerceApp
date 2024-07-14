import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'
import { Result } from 'antd'
import axios from 'axios'
const SearchInput = () => {
    const [search,setSearch]=useSearch()
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const {data}=await axios.get(`/api/v1/product/search-product/${search.keyword}`)
            
            setSearch({...search,result:data})
            navigate('/search')
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <div className='d-flex flex-wrap' >
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control " 
            type="search" 
            placeholder="Search " 
            aria-label="Search" 
            value={search.keyword}
            onChange={(e)=>setSearch({...search,keyword:e.target.value})}/>
           
         </form>
        </div>
    </div>
  )
}

export default SearchInput

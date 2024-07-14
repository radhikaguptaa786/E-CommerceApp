import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const {Option}=Select;
const CreateProduct = () => {
  const navigate=useNavigate()
  const [categories,setCategories]=useState([])
  const [photo,setPhoto]=useState("")
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("")
  const [quantity,setQuantity]=useState("")
  const [pagenumbers,setPageNumbers]=useState("")
  const [shipping,setShipping]=useState("")
  const [returnable,setReturnable]=useState("")
  const[author,setAuthor]=useState("");
  const[binding,setBinding]=useState("");

    // get all categories
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch(error) {
        console.log(error);
        toast.error("something went wrong getting in category");
      }
    };

    useEffect(() => {
      getAllCategory();
    },[]);

    // create product function ---handle create
    const handleCreate=async(e)=>{
      e.preventDefault();
      try{
        const productdata=new FormData();
        productdata.append("name",name)
        productdata.append("description",description)
        productdata.append("price",price)
        productdata.append("photo",photo)
         productdata.append("category",category)
         productdata.append("quantity",quantity)
         productdata.append("pagenumbers",pagenumbers)
         productdata.append("author",author)
         productdata.append("binding",binding)

          const {data}=axios.post('/api/v1/product/create-product',productdata);
          
          if(data?.success){
            toast.error(data.message)
          }else{
            toast.success('Product created successfully');
            navigate('/dashboard/admin/product')
          }
      }catch(error){
        console.log(error);
        toast.error('Something went wrong in handle create');
      }
    }
  return (
    <>
      <Layout title={"createProduct"}>
      <div className='container-fluid m-3 p-3'>
           <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-6'>
                <h3>Products</h3>
                <div className='m-1 w-75'>
                  <Select variant={false} placeholder="Select a category" size='large' showSearch 
                  className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                      {categories?.map((c)=>(
                        <Option key={c._id} value={c._id}>{c.name}</Option>
                      ))}
                  </Select>
                  <div className='mb-3'>
                    <label  className='btn btn-outline-secondary '>
                      {photo?photo.name: "Upload Photo"}
                    <input type='file' name='photo' accept='images/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                    
                    </label>
                  </div>
                  <div className='mb-3'> 
                        {photo && (
                          <div className='text-center'>
                            {/* get image from url */}
                              <img src={URL.createObjectURL(photo)} 
                              alt='product_photo' height={'200px'} 
                              className='img img-responsive'></img> 
                          </div>
                        )}
                  </div>
                  <div className='mb-2'>
                    <input type='text' value={name} 
                    placeholder='write a name'
                     className='form-control'
                    onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <textarea value={description} 
                    placeholder='write Description'
                     className='form-control'
                    onChange={(e)=>setDescription(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <textarea value={author} 
                    placeholder='Author'
                     className='form-control'
                    onChange={(e)=>setAuthor(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <textarea value={binding} 
                    placeholder='Binding Type'
                     className='form-control'
                    onChange={(e)=>setBinding(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <input type='number' value={price} 
                    placeholder='write Price'
                     className='form-control'
                    onChange={(e)=>setPrice(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <input type='number' value={quantity} 
                    placeholder='write Quantity'
                     className='form-control'
                    onChange={(e)=>setQuantity(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <input type='number' value={pagenumbers} 
                    placeholder='No. of Pages'
                     className='form-control'
                    onChange={(e)=>setPageNumbers(e.target.value)}/>
                  </div>
                  <div className='mb-2'>
                    <Select value={shipping} variant='false' showSearch
                    placeholder='select shipping'
                     className='form-control'
                    onChange={(value)=>setShipping(value)}>
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                      </Select>
                  </div>
                  <div className='mb-2'>
                    <Select  variant='false' showSearch
                    placeholder='Returnable'
                     className='form-control'
                    onChange={(value)=>{setReturnable(value);
                    }}
                    value={returnable?"Yes":"No"}>
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                      </Select>
                  </div>
                  <div className='mb-3'>
                      <button className='btn btn-primary' onClick={handleCreate}>Create</button>
                  </div>
                </div>
            </div>
           </div>
        </div>
        </Layout>
    </>
  )
}

export default CreateProduct

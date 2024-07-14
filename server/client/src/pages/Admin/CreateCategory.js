import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal }from 'antd';

const CreateCategory = () => {
  const [categroies, setCategories] = useState([]);
  const [name,setName]=useState("")
  const [visible,setVisisble]=useState(false)
  const [updatedName,setUpdatedName]=useState("")
  const [Selected,setSelected]=useState(null)
  // handle form
  const handleSubmit= async (event)=>{
    event.preventDefault();
    try{
      console.log("cREATE CATEGORY ERROR");
      const {data}=await axios.post('/api/v1/category/create-category',{name})
      
      if(data?.success){
        toast.success(`${data.name} is created`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error);
      toast.error('something went wrong in input form')
    }
  }
  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch(error) {
      console.log(error);
      toast.error("something went wrong in category");
    }
  };

  useEffect(() => {
    getAllCategory();
  },[]);

  // update category
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try{
        const {data}=await axios.put(`/api/v1/category/update-category/${Selected._id}`,{name:updatedName})
        
        if(data.success){
          toast.success(`${updatedName} is updated`)
          setSelected(null)
          setUpdatedName("")
          setVisisble(false)
          getAllCategory();
        }else{
          console.log("Can't Updated")
          toast.error(data.message)
        }
    }catch(error) {
      console.log(error);
      toast.error("something went wrong in updating category");
    }
  }
   // Delete category
   const handleDelete=async(pid)=>{
    try{
        const {data}=await axios.delete(`/api/v1/category/delete-category/${pid}`,)
        
        if(data.success){
          toast.success(`Category is deleted`)
          getAllCategory();
        }else{
          console.log("Can't Deleted")
          toast.error(data.message)
        }
    }catch(error) {
      console.log(error);
      toast.error("something went wrong in deleting category");
    }
  }
  return (
    <>
      <Layout title={"createCategory"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-6">
              <h3>Manage Categories</h3>
              <div className="p-3 ">
                <CategoryForm handleSubmit={handleSubmit} 
                  value={name} setValue={setName}/>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categroies?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{setVisisble(true);setUpdatedName(c.name);setSelected(c);}}>Edit</button>
                            <button className=" btn btn-delete btn-danger m-1" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal onCancel={()=>{setVisisble(false)}} footer={null} open={visible}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;

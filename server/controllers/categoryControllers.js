import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import toast from 'react-hot-toast'
import ProductModel from "../models/ProductModel.js";
export const createCategoryControllers=async (req,res)=>{
    try{
        const {name}=req.body
        if(!name){
            return res.status(401).send({
                message:'name is required'
            })
        }
        const existingCategory=await categoryModel.findOne({name});
        if(existingCategory)
        {
            return res.status(200).send({
                success:true,
                message:'category is already exist'
            })
        }

        const category =await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new Category added',
            category
        })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Category',
            error
        })
    }
}

// update category
export const UpdatecategoryController=async (req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        toast.success('Category updated')
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category
        })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Category',
            error
        })
    }
}

// get all category
export const categoryController = async (req,res)=>{
    try{
        const category = await categoryModel.find()
       
        res.status(200).send({
            success:true,
            message:'All Categories Lsit',
            category
        })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in GET Category',
            error
        })
    }
}

// Single Category 
export const singleCategoryController = async (req,res)=>{
    try{
        const {slug}=req.params.slug
        const category = await categoryModel.findOne(slug)
        toast.success('Category updated')
        res.status(200).send({
            success:true,
            message:'All Categories Lsit',
            category
        })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in GET Category',
            error
        })
    }
}

// delete category
export const deleteCategoryController = async (req,res)=>{
    try{
        const {id}=req.params
        console.log(id);
        const category = await categoryModel.findByIdAndDelete(id)
        toast.success('Category Deleted')
        res.status(200).send({
            success:true,
            message:'Category Deleted',
            category
        })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in deleting  Category',
            error
        })
    }
}
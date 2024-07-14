import { Schema } from "mongoose";
import mongoose from "mongoose";
import slug from "slugify";
const productSchema=new Schema({
   name:{
    type:String,
    required:true,
   },
   slug:{
    type:String,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   price:{
    type:Number,
    required:true
   },
   category:{
    type:mongoose.ObjectId,
    ref:'Category',
    required:true
   },
   quantity:{
      type:Number,
      required:true
   },
   photo:{
        data:Buffer,
       contentType: String
   },
   author:{
      type:String,
      // required:true
   },
   binding:{
      type:String,
      // required:true
   },
   shipping:{
    type:Boolean
   },
   returnable:{
      type:Boolean,
      
     },
     pagenumbers:{
      type:Number,
     }
},{timestamps:true})

export default mongoose.model('product',productSchema)
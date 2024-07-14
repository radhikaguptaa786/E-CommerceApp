import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema({
 products:[ {
        type:mongoose.ObjectId,
        ref:"product",
    }
 ],
 payment:{},
 buyer:{
    type:mongoose.ObjectId,
    ref:"users",
 },
 status:{
    type:String,
    default:"Not Process",
    enum:["Not Process","Processing","Shipped","Deliever","Cancel"],
 }
},
{timestamps:true});

export default mongoose.model("Order", orderSchema);

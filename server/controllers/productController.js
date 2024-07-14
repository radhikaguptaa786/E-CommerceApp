import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from '..//models/orderModel.js'
import toast from "react-hot-toast";
import braintree from "braintree";
import fs from "fs";
import { log } from "console";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv'

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
  try {
    console.log("||||");
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        res.status(500).send({ error: "Name is Required" });
      case !description:
        res.status(500).send({ error: "Description is Required" });
      case !price:
        res.status(500).send({ error: "Price is Required" });
      case !category:
        res.status(500).send({ error: "Category is Required" });
      case !quantity:
        res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and shuld be less than 1mb",
        });
    }

    const products = await ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Products",
      error,
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Products",
      error: error.message,
    });
  }
};
//get all users
// get all products
export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({})
      .populate("name")
      .select("-password")
      // .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: users.length,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error: error.message,
    });
  }
};

// get single product
export const getsingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      counTotal: product.length,
      message: "single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single Products",
      error: error.message,
    });
  }
};

// get photo controller
export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo Products",
      error
    });
  }
};

// delete rpoduct controller
export const deleteProductController = async (req, res) => {
  try {
    const product=await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success:true,
      message:'Product deleted',
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Products",
      error: error.message,
    });
  }
};

// update product controller
export const updateProductController=async (req,res)=>{
    try{
      const { name, description, price, category, quantity } =
        req.fields;
        
      console.log("||||");
      const { photo } = req.files;
  
      // Validation
      switch (true) {
        case !name:
          res.status(500).send({ error: "Name is Required" });
        case !description:
          res.status(500).send({ error: "Description is Required" });
        case !price:
          res.status(500).send({ error: "Price is Required" });
        case !category:
          res.status(500).send({ error: "Category is Required" });
        case !quantity:
          res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          console.log("cannot upload photo");
          return res.status(500).send({
            error: "Photo is required and shuld be less than 1mb",
          });
      }
  
      const products = await ProductModel.findByIdAndUpdate(req.params.pid,
        {...req.fields,slug:slugify(name)},{new:true})
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product updated Successfully",
        products,
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while updating Products",
        error: error.message,
      });
    }
}

// filter controller
export const productFiltersController=async(req,res)=>{
    try{
        const {checked,radio}=req.body
        let args={}
        if(checked.length>0) args.category=checked
        if(radio.length) 
        {args.price={$gte:radio[0],$lte:radio[1]}}
        const products=await ProductModel.find(args)
        res.status(200).send({
          success:true,
          products
        })
    }catch(error){
      console.log(error);
      res.status(400).send({
        success:false,
        message:"Error while filtering product",
        error
      })
    }
}

// productCountController
export const productCountController=async(req,res)=>{
  try{
      const total=await ProductModel.find({}).estimatedDocumentCount()
      res.status(200).send({
        success:true,
        total,
      })
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      message:"Error in product count",
      error
    })
  }
}

// product List base on page Controller
export const productListController=async(req,res)=>{
    try{
        const perpage=8;
        // to access dynamically
        const page=req.params.page?req.params.page:1
        const products=await ProductModel
        .find({})
        .select("-photo").skip((page-1)*perpage)
        .limit(perpage).sort({createdAt:-1})
        res.status(200).send({
          success:true,
          products,
        })

    }catch(error){
      console.log(error);
      res.status(400).send({
        success:false,
        message:"Error in product list",
        error
      })
    }
}

// searchProductController
export const searchProductController=async(req,res)=>{
  try{
      const {keyword}=req.params
      const result =await ProductModel.find({
        $or:[
          {name:{$regex:keyword,$options:"i"}} ,  //options for case insensitive , regex to match string
          {author:{$regex:keyword,$options:"i"}},
          {binding:{$regex:keyword,$options:"i"}},
        ]
      }).select("-photo")
      res.json(result)
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error while searching',error,
    })

  }
}

// relatedProductController
export const relatedProductController=async (req,res)=>{
  try{
    const {pid,cid}=req.params
    const products=await ProductModel.find({
      category:cid,
      _id:{$ne:pid}
    }).select("-photo").limit(3).populate("category")
    res.status(200).send({
      success:true,
      products,
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error while loading related products',
      error
    })
  }
}

// get product by category
export const productCategoryController=async (req,res)=>{
  try{
    const category=await categoryModel.findOne({slug:req.params.slug})
    const products=await ProductModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      category,
      products
    })
  }catch(error){
    console.log(error)
    res.status(400).send({
      success:false,
      error,
      message:'Error while getting product by category'
    })
  }
}

//payment gateway
export const braintreeController=async(req,res)=>{
  try{
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err);
      }
      else {
        res.send(response);
      }
    });
  }catch(error){
    console.log(error);
  }
}

//payment
export const braintreePaymentController=async(req,res)=>{
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
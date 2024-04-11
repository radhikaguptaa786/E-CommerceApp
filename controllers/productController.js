import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import toast from "react-hot-toast";

import fs from "fs";
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
      error: error.message,
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

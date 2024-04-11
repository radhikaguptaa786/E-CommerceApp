import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getsingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//get product
router.get('/get-product',getProductController);
// single product
router.get('/single-product/:slug',getsingleProductController);

// get photo
router.get('/product-photo/:pid',productPhotoController)
// delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController,
);
export default router;

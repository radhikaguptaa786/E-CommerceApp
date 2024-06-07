import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreeController, braintreePaymentController, createProductController, deleteProductController, getProductController, getUserController, getsingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
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
//get users
router.get('/get-users',getUserController);
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

// filter product
router.post('/product-filter',productFiltersController)

// product-count
router.get('/product-count',productCountController)

// product-per page
router.get('/product-list/:page',productListController)

// search product
router.get('/search-product/:keyword',searchProductController)

// similar-products
router.get('/related-product/:pid/:cid',relatedProductController)

// category wise products
router.get('/product-category/:slug',productCategoryController)

//payment route
//get token from brain tree
router.get('/braintree/token',braintreeController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)
export default router;

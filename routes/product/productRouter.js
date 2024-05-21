const express=require("express");
const Router=express.Router();
const authenticate=require("../../Middlewares/admin/adminauthenticate")
const productController=require("../../Controller/product/productController")
const productStorage=require("../../multer/product/productStorage");
const userauthenticate = require("../../Middlewares/user/userauthenticate");

Router.post("/addcategory",authenticate,productController.productCategory)
Router.get("/getcategory",productController.getproducts)


// productRoutes

Router.post("/addproduct",[authenticate,productStorage.single("product_image")],productController.addproduct)
Router.get("/getallproducts",productController.getallproducts);
Router.get("/getsingleproduct/:productId",productController.getsingleproduduct);
Router.get("/newarrivals",productController.getnewarrivals)
Router.delete("/deleteproduct/:productId",productController.deleteproduct)



// productreview

Router.post("/addreview/:productid",userauthenticate,productController.productreview)
Router.get("/getproductreview/:productId",productController.getproductreview);
Router.delete("/productreviewdelete/:reviewId",userauthenticate,productController.deletereview)




module.exports=Router;
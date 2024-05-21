const express=require('express');
const Router=new express.Router();
const adminController=require("../../Controller/admin/adminController")
const adminupload=require("../../multer/admin/adminStorage");
const authenticate=require("../../Middlewares/admin/adminauthenticate");


Router.post("/register",adminupload.single('admin_profile'),adminController.register);                      // single means one image only
Router.post("/login",adminController.login);
Router.get("/logout",authenticate,adminController.logout);



// admin authenticate router
Router.get("/adminverify",authenticate,adminController.adminveryfy);



module.exports=Router;
const Router=require("express").Router();
const userController=require("../../Controller/user/userController")
const userstorage=require("../../multer/user/userStorage");
const userauthenticate =require("../../Middlewares/user/userauthenticate");
const adminauthenticate = require("../../Middlewares/admin/adminauthenticate");

Router.post("/register",userstorage.single("user_image"),userController.register);
Router.post("/login",userController.login)

Router.get("/userverify",userauthenticate,userController.userverify);
Router.post("/logout",userauthenticate,userController.logout)


Router.post("/forgotpassword",userController.forgotpassword);


// for contact

Router.post("/usercontact",userauthenticate,userController.contact);





// For admin

Router.get("/getallusers",adminauthenticate,userController.getallusers)
Router.delete("/deleteuser/:userId",userController.deleteuser);








module.exports=Router;
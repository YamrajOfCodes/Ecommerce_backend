const Router=require('express').Router();
const authenticate=require("../../Middlewares/user/userauthenticate");
const cartController=require("../../Controller/cart/cartContoller");


Router.post("/addtocart/:productid",authenticate,cartController.addtocart);
Router.get("/getcarts",authenticate,cartController.getcarts);

Router.post("/removesingleItem/:productId",authenticate,cartController.removesingleItem)
Router.post("/removeallitems/:productId",authenticate,cartController.removeallitems)


// payement zhaki cart empty karayachi aahe

Router.delete("/clearcart",authenticate,cartController.clearcart);





module.exports=Router;
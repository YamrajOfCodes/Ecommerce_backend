const Router=require("express").Router();
const userauthenticate=require("../../Middlewares/user/userauthenticate")
const paymentController=require("../../Controller/Payment/paymentController")

Router.post("/payments",userauthenticate,paymentController.paymentprocess)

module.exports=Router;
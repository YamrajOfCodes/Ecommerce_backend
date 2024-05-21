const Router=require("express").Router()
const userauthenticate=require("../../Middlewares/user/userauthenticate");
const ordercontroller=require("../../Controller/Order/orderController")

Router.post("/addorder",userauthenticate,ordercontroller.addorder);
Router.get("/getUserorders",userauthenticate,ordercontroller.getUserorders);



// For admin

Router.get("/orders",userauthenticate,ordercontroller.getAllorders);
Router.put("/orders/:orderId",userauthenticate,ordercontroller.updateOrderStatus);


module.exports=Router




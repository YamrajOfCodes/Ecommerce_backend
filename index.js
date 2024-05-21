const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
require("./db/connection");           // database connection
app.use(cors());
app.use(express.json());
const { paymentprocess } = require('./Controller/Payment/paymentController');





// Admin Routes

const Adminroutes=require("./routes/Adminroutes/adminRouter");
app.use("/admin/api",Adminroutes);


// Productcategory Routes

const ProductRoutes=require("./routes/product/productRouter")
app.use("/product/api",ProductRoutes)


// user Routes

const userRoutes=require("./routes/Userroutes/userRouters");
app.use("/user/api",userRoutes);

app.get("/",(req,res)=>{
    res.send('server is listening');
})

// Payments Routes

const PaymentRoutes=require("./routes/Payments/userpayments")
app.use("/checkout/api",PaymentRoutes)

const userOrder=require("./routes/OrderRoutes/orderRoutes");
app.use("/order/api",userOrder)

// Cart Routes

const cartRouters=require("./routes/Cartroutes/cartRouters");
app.use("/cart/api",cartRouters);


app.listen(4000,()=>{
    console.log("server is start");
})
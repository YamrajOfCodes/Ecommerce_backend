const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    userId:{
        type:Object,
        required:true
    },
   
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    } ,
     mobile:{
        type:String,
        required:true
    },
     state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    orderItems:[],
    paymentAt:{
        type:Date,
        default:Date.now
    },
    itemprice:{
        type:Number,
        required:true,
        default:0
    },
    shippingprice:{
        type:Number,
        required:true,
        default:0
    },
    totalprice:{
        type:Number,
        required:true,
        default:0
    },
});

const orderitemDb=new mongoose.model("order",orderSchema);
module.exports=orderitemDb;
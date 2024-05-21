const mongoose=require("mongoose");

const mainproductSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productcategory:{
        type:String,
        
    }
})

const mainproductDb=mongoose.model("mainproduct",mainproductSchema);
module.exports=mainproductDb
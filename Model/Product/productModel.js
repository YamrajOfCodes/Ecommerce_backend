const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productCategory:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    }
})

const productDb=mongoose.model("productmodel",productSchema);
module.exports=productDb
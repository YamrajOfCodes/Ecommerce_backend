const mongoose=require("mongoose");


const cartSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    productid:{
        type:Object,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});


const cartDb=mongoose.model("cartcollection",cartSchema);
module.exports=cartDb
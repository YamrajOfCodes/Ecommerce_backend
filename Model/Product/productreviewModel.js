const mongoose=require("mongoose");


const productreviewSchema=new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    productid:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const reviewDb=mongoose.model("productreview",productreviewSchema);
module.exports=reviewDb
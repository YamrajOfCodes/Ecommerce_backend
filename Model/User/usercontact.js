const mongoose = require("mongoose");

const usercontact=new mongoose.Schema({
    namee:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },

})


const usercontactDb=mongoose.model("usercontact",usercontact);
module.exports=usercontactDb
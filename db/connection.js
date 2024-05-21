const mongoose=require("mongoose");

const dbUrl=process.env.DATABASE;

mongoose.connect(dbUrl,{
}).then(()=>console.log("database connected")).catch((e)=>console.log("error",e))
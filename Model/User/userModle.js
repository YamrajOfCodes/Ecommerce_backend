const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const SECRET_KEY='sjdiajdiowd';


const userSchema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    userprofile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    verifytoken:{
        type:String
    }
    
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,12);
    }
    next();
  })

  userSchema.methods.generatelogintoken=async function(req,res){
    try {
     const newtoekn=jwt.sign({_id:this._id},SECRET_KEY,{
       expiresIn:"1d"
     });
     this.tokens=this.tokens.concat({token:newtoekn})
     await this.save();
     return newtoekn
   
    } catch (errors) {
    console.log(errors);
    }
   }
   
  

const userDb=mongoose.model("user",userSchema);
module.exports=userDb;
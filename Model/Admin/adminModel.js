const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const SECRET_KEY="sjhdoashd"


const adminSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validator(value){
        if(!validator.isEmail(value)){
            throw new Error('invalid email')
        }
    }
  },
  profile:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true,
    unique:true,
    minlength:10,
    maxlength:10
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
  ]
})

// password hashing

adminSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,12);
  }
})


// generate token

adminSchema.methods.generatelogintoken=async function(req,res){
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


const adminmodel=mongoose.model('admins',adminSchema);                    // collection name and schema name  means tya navach model create karata aahe
module.exports=adminmodel
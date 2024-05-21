const { json } = require("express");
const cloudinary=require("../../cloudinary/cloudinary");
const admindb=require("../../Model/Admin/adminModel");
const upload = require("../../multer/admin/adminStorage");
const bcrypt=require("bcryptjs");


const register=async(req,res)=>{
 
   const {name,email,mobile,password,confirmpassword}=req.body;
  

   if(!name || !email || !mobile || !password || !req.file || !confirmpassword ){
       res.status(400).json({
        error:"all fields are required"
       })
   }

   const file=req.file?.path;
   const upload=await cloudinary.uploader.upload(file);

   try {
    

    const presentemail= await admindb.findOne({email:email});
    const presentmobile= await admindb.findOne({mobile:mobile});

   if(presentemail){
    res.status(400).json({
        error:"Admin already present"
    })
   }
   else if(presentmobile){
  res.status(400).json({
    error:"mobile number is already present"
  })
 
   } else if(password !== confirmpassword){
    res.status(400).json({
        error:"password does not matched"
      })
   }else{
    const newAdmin= new admindb({
        name,email,mobile,password,profile:upload.secure_url
    })

    await newAdmin.save();

    res.send(newAdmin)
   }


   } catch (error) {
    
   }


}

const login=async(req,res)=>{

 const {email,password}=req.body;
 
 if(!email || !password){
    return res.status(400).json({
        error:'Both fields are required'
    })
 }

 const validadmin=await admindb.findOne({email:email});

 if(validadmin){

      const verify= await bcrypt.compare(password,validadmin.password);

      if(!verify){
       return res.status(400).json({error:"Password is incorrect"});
      }

        const token= await validadmin.generatelogintoken();
        const result={
            validadmin,
            token
        }

        res.status(200).json(result)

 }else{
    res.status(400).json({error:"please register first"})
 }

}


const logout=async(req,res)=>{

 try {
    
    req.rootUser.tokens=req.rootUser.tokens.filter((element)=>{
        return element.token !== req.token;
    })

    console.log(req.rootUser.tokens);

    req.rootUser.save();
    res.status(200).json({message:"successfully logout"})

 } catch (error) {
    res.status(400).json(error)
 }

}

const adminveryfy=async(req,res)=>{

    try {
        const VerifyAdmin = await admindb.findOne({_id:req.userId});
        res.status(200).json(VerifyAdmin)
    } catch (error) {
        console.log(req.userId);
        res.status(400).json({error:"invalid Details"})
    }

   

}





















module.exports={register,login,adminveryfy,logout}
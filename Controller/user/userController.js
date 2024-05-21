const usercontactDb =require("../../Model/User/usercontact");

const cloudinary=require("../../cloudinary/cloudinary");
const userDb=require("../../Model/User/userModle")
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
 const SECRET_KEY='3232323KDSKDJ9';
 const path=require('path');
 const fs=require("fs");
 const ejs=require('ejs');
 const transporter=require("../../helper");

const register=async(req,res)=>{
  const {Firstname,Lastname,email,password,confirmpassword}=req.body;

  if(!Firstname || !Lastname || !email || !password || !confirmpassword || !req.file){
    return res.status(400).json({error:"all fields are required"})
  }

  const file=req.file?.path;
  const upload=await cloudinary.uploader.upload(file);

  try {

    

    const user=await userDb.findOne({email:email});
    console.log("user",user);

    if(user){
         res.status(400).json({error:"user are already present"})
    }else if(password !== confirmpassword){
         res.status(400).json({error:"password does not matched"})
    }else{
        
      console.log('reached');
       

  const userdata= new userDb({
    Firstname:Firstname,
    Lastname:Lastname,
    email:email,
    password:password,
    userprofile:upload.secure_url
  })


    await userdata.save();

    res.send(userdata)

       
    }
    
  } catch (error) {
    res.status(400).json(error)
  }

}

const login =async(req,res)=>{
  const {email,password}=req.body;

 if(!email || !password){
  return res.status(400).json({error:"both fields are required"});
 }

 const validuser=await userDb.findOne({email:email});


 if(validuser){
  
  const match= await bcrypt.compare(password,validuser.password);

  if(!match){
   return res.status(400).json({error:"password are incorrect"});
  }

  const token=await validuser.generatelogintoken();

   const result={
    validuser,
    token
   }

   res.status(200).json(result);

 }else{
  res.status(400).json({error:"user are not present"})
 }

}

const userverify=async(req,res)=>{
  try {
    const VerifyAdmin = await userDb.findOne({_id:req.userId});
    // console.log(VerifyAdmin);
    res.status(200).json(VerifyAdmin)
} catch (error) {
    console.log(req.userId);
    res.status(400).json({error:"invalid Details"})
}}


const logout=async(req,res)=>{
  try {
    // console.log(req.rootUser.tokens);
    req.rootUser.tokens=req.rootUser.tokens.filter((element)=>{
      return element.token !== req.token;
        })

    req.rootUser.save();
    res.status(200).json({message:"successfully logout"})

 } catch (error) {
    res.status(400).json(error)
 }
}

const forgotpassword=async(req,res)=>{

 const {email} = req.body;
    
 if(!email){
     res.status(400).json({error:"enter your email"});
 }
 try {

     const userfind = await userDb.findOne({email:email});
  

     if(userfind){
         // token generate for password change
         const token = jwt.sign({_id:userfind._id},SECRET_KEY,{
             expiresIn:"120s"
         });

         const setusertoken = await userDb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
         
         // join email path
         const emailTemplatepath = path.join(__dirname,"../../ForgotpasswordTemplate/ForgotTemplate.ejs");
         const emailtemplateread = fs.readFileSync(emailTemplatepath,"utf8");

         
         
         // Set token and logo value in ejs file
         const data = {
             passwordresetlink:`'https://localhost:3000/${userfind.id}/${setusertoken.verifytoken}`,
             logo:"https://cdn-icons-png.flaticon.com/128/732/732200.png"
         }
         // set dynamic datavalue in ejs
         const renderTemplate = ejs.render(emailtemplateread,data);

         if(setusertoken){
             const mailOptions = {
                 from:'kundanpatil0111@gmail.com',
                 to:email,
                 subject:"Sending Email For password Reset",
                 html:renderTemplate
             }
             transporter.sendMail(mailOptions,(error,info)=>{
                 if(error){
                     console.log("error",error)
                     res.status(400).json({error:"email not send"})
                 }else{
                     console.log("email sent",info.response)
                     res.status(200).json({message:"Email sent Sucessfully"})
                 }
             })
         }
     }else{
         res.status(400).json({error:"this user is not exist"})
     }
     
 } catch (error) {
     res.status(400).json(error)
     
 }
}

const contact=async(req,res)=>{
  const {namee,email,message}=req.body;

  if(!namee ||!email || !message){
    return res.status(400,{error:"all fields are required"})
  }

  try {
    
    const usercontactdata=new usercontactDb({
      namee,email,message
    })

    await usercontactdata.save();

    res.status(200,{usercontactdata})

  } catch (error) {
    res.status(400).json(error)
    
  }
}














// For admin

const getallusers=async(req,res)=>{

try {
  
const page= req.query.page || 1;
const Item_Per_page=4;

const skip=(page-1) * Item_Per_page;

const count=await userDb.countDocuments();

const pagecount=Math.ceil(count/Item_Per_page)

const userdata=await userDb.find()
.skip(skip)
.limit(Item_Per_page)
.sort({_id:-1});

res.status(200).json({
  pagination:{
    count,pagecount
  },
  userdata

})


} catch (error) {
  res.status(400).json(error);
  console.log('error');
}

}

const deleteuser=async(req,res)=>{

  const {userId}=req.params;

  try {
    
    const deleteuser=await userDb.findByIdAndDelete({_id:userId});
    res.status(200).json("user are deleted")

  } catch (error) {
  res.status(400).json(error);
    
  }
}










module.exports={register,login,userverify,logout,forgotpassword,getallusers,deleteuser,contact};
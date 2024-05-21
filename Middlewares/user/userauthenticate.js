const userDb = require("../../Model/User/userModle");
const jwt=require("jsonwebtoken");
const SECRET_KEY='sjdiajdiowd';



const userauthenticate=async(req,res,next)=>{
    try {
        console.log("hello");
        const token=req.headers.authorization;
        const verifyToken=jwt.verify(token,SECRET_KEY);
        
        const rootuser= await userDb.findOne({_id:verifyToken._id});

        if(!rootuser){
            throw new Error("Admin is not verified")
        }

        req.token=token;
        req.rootUser=rootuser;
        req.userId=req.rootUser._id;

        console.log(req.rootUser._id);
      
        next();
 
        
    } catch (errors) {
        res.status(400).json("token is not provide")
    }
}

module.exports=userauthenticate
const jwt=require("jsonwebtoken");
const SECRET_KEY="sjhdoashd"
const admindb=require("../../Model/Admin/adminModel");


const adminauthenticate=async(req,res,next)=>{
    try {
        const token=req.headers.authorization;
        const verifyToken=jwt.verify(token,SECRET_KEY);
        
        const rootuser= await admindb.findOne({_id:verifyToken._id});

        if(!rootuser){
            throw new Error("Admin is not verified")
        }

        req.token=token;
        req.rootUser=rootuser;
        req.userId=req.rootUser._id;
      
        next();
 
        
    } catch (errors) {
        res.status(400).json("token is not provide")
    }
}

module.exports=adminauthenticate
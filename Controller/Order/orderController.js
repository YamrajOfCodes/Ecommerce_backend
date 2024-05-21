const orderitemDb = require("../../Model/Order/orderModel");
const userDb=require("../../Model/User/userModle");
const moment=require("moment")


exports.addorder=async(req,res)=>{
 const {mobile,city,pincode,country,shippingprice,itemprice,totalprice,state,orderItems}=req.body;

 console.log(mobile,city,pincode,country,shippingprice,itemprice,totalprice,state,orderItems,req.userId )
 const deliverydate=moment().add(2,"days").format("YYYY-MM-YY");

 try {
    
    const userorder= new orderitemDb({
        userId:req.userId,
        mobile,city,pincode,country,shippingprice,totalprice,state,itemprice,
        deliveredAt:deliverydate,
        orderItems,
        

    })

    await userorder.save();
    res.status(200).json(userorder);

 } catch (error) {
    res.status(400).json(error)
 }
}

exports.getUserorders=async(req,res)=>{

try {
    console.log("id",req.userId)
    const usersdata=await orderitemDb.find({userId:req.userId}).sort({_id:-1})
    console.log("hello",usersdata);
    res.status(200).json(usersdata)
} catch (error) {
    res.status(400).json(error)
    
}
    
}

exports.getAllorders=async(req,res)=>{

    try {
        const getalldata=await orderitemDb.find().sort({id:1});
        res.status(200).json(getalldata)
    } catch (error) {
    res.status(400).json(error)
        
    }

}
exports.updateOrderStatus=async(req,res)=>{
const {orderId}=req.params;
const {orderStatus}=req.body;


try {
    const getorder=await orderitemDb.findOne({_id:orderId});
    const getuser=await userDb.findOne({_id:getorder.userId})

    if(getorder.orderstatus=="Processing"  && orderStatus=="completed"){
        const updateorder=await orderitemDb.findByIdAndUpdate({_id:orderId},{orderstatus:orderStatus},{new:true})
        await updateorder.save();
    }else if(getorder.orderstatus=="confirmed"  && orderStatus=="shipped"){
        const updateorder=await orderitemDb.findByIdAndUpdate({_id:orderId},{orderstatus:orderStatus},{new:true})
        await updateorder.save();
    }else if(getorder.orderstatus=="shipped"  && orderStatus=="delivered"){
        const updateorder=await orderitemDb.findByIdAndUpdate({_id:orderId},{orderstatus:orderStatus},{new:true})
        await updateorder.save();
    }else{
        res.status(400).json("invalid status")
    }
    
} catch (error) {
    res.status(400).json(error)
    
}
}



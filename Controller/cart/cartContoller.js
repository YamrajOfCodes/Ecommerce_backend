const mainproductDb = require("../../Model/Product/mainproductModel");
const cartDb=require("../../Model/cart/cartModel");








exports.addtocart=async(req,res)=>{
    const {productid}=req.params;
    console.log(productid);
    console.log(req.rootUser.id);



  try {
       const product=await mainproductDb.findOne({_id:productid});
       console.log(product);
    const productavailable=await cartDb.findOne({userid:req.rootUser.id,productid:product._id});          //product is laready exist or not quantity 1 or quantity+
   

    console.log(productavailable);



    if(!productavailable){
        const savecart=new cartDb({
            userid:req.rootUser.id,
            productid:product._id,
            quantity:1
        })

        await savecart.save();
        res.status(200).json("product has been add in cart")
     
    }
    else{
        productavailable.quantity = productavailable.quantity+1;
        await productavailable.save();
       
        if(product.quantity>=1){
            product.quantity=product.quantity-1;
            await product.save();
            res.status(200).json("product are increment")
        }else{
            res.status(400).json({error:"product are not available"})
        }
        }
    
   } catch (error) {
    res.status(400).json(error);
   }
}

// exports.getcarts=async(req,res)=>{
    
//     try{

//         // console.log(req.userid.id);
        
//     const carts=await cartDb.aggregate([
//         {
//             $match:{userid:req.rootUser.id}
//         },
//         {
//             $lookup:{
//                 from:"mainproducts",
//                 localField:"productid",
//                 foreignField:"_id",
//                 as:"productdetails"
//             }
//         },
        
//         {

//             $project:{
//                 _id:1,
//                 userid:1,
//                 productid:1,
//                 quantity:1,
//                 productdetails:{$arrayElemAt:[`$productdetails`,0]}         // 1 1 means ha data pahije avaialble aahe pn pahije aahe 
//             }

//         }
//     ])

//     res.status(200).json(carts)

//     }catch (error) {
//         res.status(400).json(error);
//     }
// }


exports.getcarts = async (req, res) => {

    console.log("tc",req.rootUser.id);

    try {
        const getCarts = await cartDb.aggregate([
            {
                $match:{userid:req.rootUser.id}
            },
            {
                $lookup: {
                    from: "mainproducts",
                    localField: "productid",
                    foreignField: "_id",
                    as: "productdetails"
                }
            },
            // getting first data from prodcut details array
            {
                $project: {
                    _id: 1,
                    userid: 1,
                    productid: 1,
                    quantity: 1,
                    productdetails: { $arrayElemAt: ['$productdetails', 0] } //Extract first element of the product array
                }
            }
        ]);

        res.status(200).json(getCarts)
    } catch (error) {
        res.status(400).json(error)
    }
}


exports.removesingleItem=async(req,res)=>{
    try {
        
   const {productId}=req.params;

    const product=await mainproductDb.findOne({_id:productId});
    

    const cart=await cartDb.findOne({userid:req.rootUser.id,productid:product._id});   

    // console.log(cart);


   if(!cart){
    res.status(400).json({error:'item is not found'})
   }
   
   if(cart.quantity>1){

    cart.quantity=cart.quantity-1;
    await cart.save();
    product.quantity=product.quantity+1;         // product parat increment
    await product.save();
    res.status(200).send({message:"item are decremented"})
    console.log(cart);

   }else if(cart.quantity=1){
    const deletecart=await cartDb.findByIdAndDelete({_id:cart._id});
     res.status(200).json({message:"product are successfully remove from cart"})
     console.log(cart);
   }


    } catch (error) {
        res.status(400).json(error);
    }
}

exports.removeallitems=async(req,res)=>{
    const {productId}=req.params;

   try {
    const product=await mainproductDb.findOne({_id:productId});

    const cart=await cartDb.findOne({userid:req.rootUser.id,productid:product._id});   

    if(!cart){
        res.status(400).json({error:'cart item not found'})
    }

    const cartdelete=await cartDb.findByIdAndDelete({_id:cart._id});

    product.quantity=product.quantity+cart.quantity;
    await product.save();

    res.status(200).json({message:"cart item are removed successfully"})
   } catch (error) {
    res.status(400).json(error);
    
   }
}

exports.clearcart=async(req,res)=>{

    try {
        const deleteItem=await cartDb.deleteMany({userid:req.rootUser._id});
        res.status(200).json({message:"all products are removed"})

    } catch (error) {
    res.status(400).json(error);
        
    }
}
const productDb=require("../../Model/Product/productModel");
const cloudinary=require("../../cloudinary/cloudinary")
const mainprodutctDb=require("../../Model/Product/mainproductModel");
const mainproductDb = require("../../Model/Product/mainproductModel");
const reviewDb=require("../../Model/Product/productreviewModel");

const productCategory=async(req,res)=>{
    const {productCategory,productDescription}=req.body;
    if(!productCategory || !productDescription){
        res.status(400).json({error:"both fields are required"});

    }

       try {
        
        const avialablecategory=await productDb.findOne({productCategory:productCategory});

        if(avialablecategory){
       res.status(400).json({error:"Product category already existed"});
        }else{

            
            const addproductcategory=new productDb({
                productCategory,productDescription
            })
            
            await addproductcategory.save();
            res.status(200).json(addproductcategory)
        }


       } catch (error) {
        res.send(error)
       }

}

const getproducts=async(req,res)=>{

    try {
        const getallcategory=await productDb.find();
        res.status(200).json(getallcategory)
    } catch (error) {
        res.status(400).json(error);
    }
    
}


const addproduct=async(req,res)=>{


    const {productcategory}=req.query;
    const {productname,price,discount,quantity,description}=req.body;
    const file=req.file ? req.file.path:'';

    if(!productname || !price || !discount || !quantity || !description || !file){
        return res.status(400).json({error:"all fields are required"})
    }

    try {
        const upload=await cloudinary.uploader.upload(file);

        const existingproduct=await mainprodutctDb.findOne({productname:productname});
        if(existingproduct){
            return res.status(400).json({error:"Product are existing"})
        }else{
    
            const saveproduct=new mainprodutctDb({
                productname,price,discount,quantity,description,productcategory, productimage:upload.secure_url
            })

            await saveproduct.save();
            res.status(200).json(saveproduct)
            
            
            
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getallproducts=async(req,res)=>{


    // three task here fetchproducts, pagination , categorywese filter

    const categoryid=req.query.categoryid || "";
    const page=req.query.page || 1;
   const Item_Per_page=3;
    const query={};

    if(categoryid !== "all" && categoryid){
        query.categoryid=categoryid;
    }

   try {

    const skip=(page-1)* Item_Per_page

    // productCount

    const productCount=await mainprodutctDb.countDocuments();
    // console.log("productcount",productCount);


    const getallproductsfromdatabase=await mainprodutctDb.find()
    .limit(Item_Per_page)
    .skip(skip)


    const pagecount=Math.ceil(productCount/Item_Per_page)
    // console.log(pagecount);

    res.status(200).json({
        getallproductsfromdatabase,
    
        pagination:{
            totalProducts:productCount,
            pageCount:pagecount
        }})
    
   } catch (error) {
    res.status(400).json(error)
   } 

}

const getsingleproduduct=async(req,res)=>{
  const {productId}=req.params;
 console.log(productId);
  try {
    
  const singleproduct=await mainprodutctDb.findOne({_id:productId});
  res.status(200).json(singleproduct);

  } catch (error) {
    console.log("fs");
    res.status(400).json(error);
  }
}

const getnewarrivals=async(req,res)=>{

    try {
        
        const getnewproducts=await mainproductDb.find().sort({id:-1});

        res.status(200).json(getnewproducts)

    } catch (error) {
    res.status(400).json(error);
        
    }
}

const deleteproduct=async(req,res)=>{
    const {productId}=req.params;

    try {
        
  const deleteproduct=await mainprodutctDb.findByIdAndDelete({_id:productId});
  res.status(200).json(deleteproduct)

    } catch (error) {
    res.status(400).json(error);
        
    }
}

const productreview=async(req,res)=>{
 const {productid}=req.params;

 const {username,rating,description}=req.body;
 if(!username || !rating || !description || !productid){
    res.status(400).json({error:'all fields are required'})
 }

try {
   
  const addreview=new reviewDb({
    userid:req.rootUser.id,
    username,
    description,
    rating,
    productid
  }) 

  await addreview.save();

  res.status(200).json({message:'review are added successfully'})
} catch (error) {
    res.status(400).json(error);
    
}
 
}


const getproductreview=async(req,res)=>{
 
     const {productId}=req.params;

     try {
        const getreviews=await reviewDb.find({productid:productId});
        res.status(200).json(getreviews)
     } catch (error) {
    
        res.status(400).json(error);
     }

}

const deletereview=async(req,res)=>{
   const {reviewId}=req.params;

   try {
    
   const getproduct=await reviewDb.findByIdAndDelete({_id:reviewId});
 
   re.status(200).json({message:'review successfully deleted'})

   } catch (error) {
    
    res.status(400).json(error);

   }
}













module.exports={productCategory,getproducts,addproduct,getallproducts,getsingleproduduct,getnewarrivals,deleteproduct,productreview,getproductreview,deletereview}
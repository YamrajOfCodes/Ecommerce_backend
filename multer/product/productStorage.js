const multer=require("multer");



const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./productsupload")
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}=${file.originalname}`;
        callback(null,filename)
    }
})


// filter kontya type chi image accept karaychi aahe

const filterImage=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpeg" || file.mimetype==="image/jpg"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error ("fileformat not allowed"))
    }
}

const productupload=multer({
    storage:storage,
    fileFilter:filterImage
})

module.exports=productupload
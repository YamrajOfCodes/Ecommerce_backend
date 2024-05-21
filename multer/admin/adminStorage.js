const multer=require("multer");


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./adminUploads")
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    },


})

// filter
const filterImage=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        callback(null,true);
    }else{
        callback(null,false)
        return callback(new Error("selected file format are not allowed"))
    }
}

const upload=multer({
    storage:storage,
    fileFilter:filterImage
})

module.exports=upload;
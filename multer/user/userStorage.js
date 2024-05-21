const multer=require('multer');


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./userUploads");
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}.${file.originalname}`;
        callback(null,filename)
    }
})


const filterimage=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpeg" || file.mimetype==="image/jpg"){
        callback(null,true)
    }else{
        callback(null,false);
        return callback(new Error("file format is not suitable"))
    }
}

const uploadimage=multer({
    storage:storage,
    fileFilter:filterimage
})

module.exports=uploadimage
const nodemailer=require("nodemailer");

const transport=nodemailer.createTransport({
    service:'gmail',
    host:'officialhungryrats.com',
    port:587,
    auth:{
        user:"kundanpatil0111@gmail.com",
        pass:"ofgnrobkenqummky"
    }
})

module.exports=transport






















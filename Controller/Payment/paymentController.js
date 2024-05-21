const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentprocess=async(req,res)=>{
    const {totalprice}=req.body;
    console.log(totalprice);
    console.log("hello");

    try {

        const payments= await stripe.paymentIntents.create({
            amount:totalprice,
            currency:'inr',
            metadata:{
                business:"E-commerce"
            }
        })

        res.status(200).json(payments.client_secret);

    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports={
    paymentprocess
}
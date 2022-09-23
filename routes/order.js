const router = require('express').Router();
const error = require('../error/error');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const Order = require('../model/order');



router.post("/create/new",authentication,async (req,res,next)=>{
    try {
        const {
            shippingInfo,
            orderItem,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }=req.body
    
        const order = await Order.create({
            shippingInfo,
            orderItem,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id
        })
    
        res.status(200).json({Message:"Order created successffully",order})
    } catch (err) {
        error(err)
    }
});



router.get("/",authentication,authorization("admin"), async (req,res,next)=>{
    try {

        const allOrder= await Order.find()
    
        res.status(200).json({Message:"all Order",orders:allOrder})
    } catch (err) {
        error(err)
    }
});



module.exports=router

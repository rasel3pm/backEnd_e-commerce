const router= require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order');


router.get('/health', (req,res,next)=>{
    res.status(200).json({message:"Test is successful"})
})

router.use("/api/v1/auth",authRouter );
router.use("/api/v1/user",userRouter );
router.use("/api/v1/product",productRouter );
router.use("/api/v1/order",orderRouter );






module.exports = router
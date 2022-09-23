const authentication  = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const User = require('../model/user');
const router = require('express').Router();

router.get('/me',authentication, async (req,res,next)=>{
    try {
        res.status(200).json({Message:"Success", user:req.user})
    } catch (err) {
        next(err)
    }
})

// all user [auth-admin] - 
router.get('/admin/users', authentication,  authorization("admin"), async (req, res, next) => {

    const users = await User.find()

    res.status(200).json({ message: "Success", users });

})










module.exports=router
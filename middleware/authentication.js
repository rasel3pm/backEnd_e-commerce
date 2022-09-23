const jwt = require('jsonwebtoken');
const error = require('../error/error');
const User = require('../model/user');


const authentication= async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if(!token){
            throw error("unouthrized",403)
        }
        const decodate =await jwt.verify(token,"DEV");
        if(!decodate){
            throw error("unouthrized",403)
        }
        const user = User.findById(decodate._id)
        
        if(!user){
            throw error("unouthrized",403)
        }

        req.user=user
        next()



    } catch (err) {
        next(err)
    }
}

module.exports=authentication
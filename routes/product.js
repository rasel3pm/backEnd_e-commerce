const router = require('express').Router();
const error = require('../error/error');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const Product = require('../model/product');

//Get all products
router.get("/",async(req,res)=>{
    try {
        const product = Product.find()
        res.status(200).json({ Message: "all Product", product })
    } catch (err) {
        error(err,404)
    }
});

//Get single products
router.get("/:id",async(req,res)=>{
    try {
        const product = Product.findById(req.params.id)
        res.status(200).json({ Message: "Product detailes", product })
    } catch (err) {
        error(err,404)
    }
})

//Create new products
router.post('/create', authentication, authorization('admin'), async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            user: req.user._id,
            image: [{ publicID: "7777", url: "yuyyrr" }]
        });
        const newProduct = await product.save();

        res.status(200).json({ Message: "Product created succesfully", product: newProduct })
    } catch (err) {
        error(err)
    }
});

//Delete products
router.delete('/:id',authentication,authorization('admin'),async (req,res,next)=>{
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        await deleteProduct.save()
    } catch (err) {
        
    }
})


router.post("/review",authentication,async(req,res,next)=>{
    try {
        const {rating,comment,productID}=req.body
        const review = {
            user:req.body._id,
            name:req.body.name,
            rating:Number(rating),
            comment
        }

        const findProduct=await Product.findById(productID);
        const isReviewed= findProduct.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

        if(isReviewed){
            findProduct.reviews.forEach(rev => {
                if(rev.user.toString()===req.user._id.toString()){
                    rev.rating=Number(rating);
                    rev.comment=comment
                }
            });

        }else{
            findProduct.reviews.push(review)
        }

        let totalRating=findProduct.reduce((prev,cur)=>cur.rating+prev,0);
        findProduct.rating*totalRating/findProduct.reviews.length;

        await findProduct.save({validateBeforeSave:false});
        res.status(201).json({Message:"review success"})
    } catch (err) {
        error(err)
    }
})

module.exports=router;
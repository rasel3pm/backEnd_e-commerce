const User = require('../model/user');
const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const err = require('../error/error');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const { findByIdAndUpdate } = require('../model/user');




//Logout


//Register
router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email: email })

        if (user) {

            throw error("Already have an account", 400)
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;

        const newUser = new User(req.body);
        const data = await newUser.save();

        res.status(200).json({ message: "User Created Successfully", user: data });

    } catch (err) {
        next(err);
    }
})


router.post('/login', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email: email })

        if (!user) {
            throw error("Invalid Credinsial", 400)
        }

        const invalidPassword = bcrypt.compare(password, user.password);
        if (!invalidPassword) {
            throw error("Invalid Credinsial", 400)
        }

        const token = jwt.sign(user._doc, "dev", { expiresIn: "2h" });
        res.status(200).json({ Message: "Login Successfully", token })

    } catch (error) {
        next(err)
    }
});

router.post('/forget/password', async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            throw err("user not found", 404)
        }
        const randomSt = randomstring.generate()

        const data = {
            resetPassToken: randomSt,
            resetPassExpire: Date.now() + 15 * 60 * 1000
        }
        let update = await User.findByIdAndUpdate(user._id, data, { new: true })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mdraselkibria11@gmail.com',
                pass: 'kueoicbfngcdntvi'
            }
        });

        var mailOptions = {
            from: 'mdraselkibria11@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            text: `your reset token link is https://localhost:5000/api/v1/auth/reset ${randomSt}`
        };

        if (update) {
            await transporter.sendMail(mailOptions)
            console.log("email send")
        }
        res.status(200).json({ message: "please check your email" })
    } catch (err) {
        next(err)
    }
});


//reset password
router.post('/reset/password/:token', async (req, res, next) => {
    try {
        const tokenURL = req.params.token
        const { password, confirmPassword } = req.body;

        const token = tokenURL.split("_")[0];
        const email = tokenURL.split("_")[1];

        const user = await User.findOne({ email: email });
        if (!user) {
            throw error("User is not found", 404)
        }
        if (password !== confirmPassword) {
            throw error("Password not matched", 404)
        }
        if (user.resetPassExpire < new Date() / 1000) {
            throw error("reset time is over")
        }
        if (token !==user.resetPassToken) {
            throw error("token is not valid")
        }


        //hash password
        const salt = bcrypt.genSalt(10);
        const hash =bcrypt.hash(password,salt);

        const data= {
            password:hash,
            resetPassExpire:null,
            resetPassToken:null
        }

        //update user
        let update = await User.findByIdAndUpdate(user._id,data, {new:true});

        res.status(200).json({message: "reset passwor was successfully "})
    } catch (err) {
        next(err)
    }
})


module.exports = router;
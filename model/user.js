const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    avatar: {
        publicID: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    },
  
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    resetPassToken: String,
    resetPassExpire: Date
})

const User = mongoose.model("User", userSchema);
module.exports = User;
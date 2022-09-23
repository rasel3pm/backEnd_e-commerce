const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter Your Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Your Product Price"],
        maxLength: [8, "Price cannot exceed 8 character"]
    },
    image: [
        {
            publicID: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        maxLength: [5, "Price cannot exceed 8 character"],
        required: [true, "Please Enter Your Product Stock"],
        default: 1,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
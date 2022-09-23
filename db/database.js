const mongoose = require('mongoose');

const connectDB= ()=>{
    try {
        mongoose.connect("mongodb+srv://kibria:kibria@cluster0.sufiz8b.mongodb.net/Dev_eCommerce?retryWrites=true&w=majority")
        .then(data=>{
            console.log(`Database is connected ${data.connection.host}`);
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB;
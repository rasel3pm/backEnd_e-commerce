const app = require('./app/app');
const connectDB=require('./db/database')
require('dotenv').config({path:"./config/config.env"})

app.use((err,req,res,next)=>{

    const statusCode = err.status ? err.status: 500;
    const message = err.message ? err.message: "Server Error Occurred"
    res.status(statusCode).json({message})
})





connectDB()
const port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`Server is Running port ${port}`)
})
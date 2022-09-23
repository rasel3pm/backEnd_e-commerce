const express = require('express');
const app = express()
const router= require('../routes/index');


app.use(require('../app/middleware'))
app.use(router)



module.exports = app;
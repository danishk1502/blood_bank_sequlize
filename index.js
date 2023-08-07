const express = require('express');
const app = express();
require('dotenv').config();
const route = require("./src/routes/router")
const mysql = require("mysql");


app.use(express.json());


// Defining routes 
app.use('/', route);





//port activation
app.listen(process.env.PORT, ()=>{
    console.log("app listen at port :"+ process.env.PORT);
    
});
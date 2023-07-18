const express = require('express');
const app = express();
require('dotenv').config();
const port = 3312;
const route = require("./src/routes/router")
const mysql = require("mysql");


app.use(express.json());


// Defining routes 
app.use('/', route);



//port activation
app.listen(port, ()=>{
    console.log("app listen at port :"+ port);
});
const joiValidations = require("../utils/joiUtils");
const jwtValidation = require("../utils/jwtUtils");



//Middelware for user registration 

const data=(req, res, next)=>{
	user = req.body;
    response = joiValidations.joiUtils(user);
    if(response.error){
        res.json({
            status:412,
            msg:response.error.details[0].message});
    }
    else{
        next();
    }
}


const updateMiddelware=(req, res, next)=>{
	dataUpdate = req.body;
    response = joiValidations.joiUpdateUtils(dataUpdate);
    if(response.error){
        res.json({
            status:412,
            msg:response.error.details[0].message});
    }
    else{
        next();
    }
}


//JWT Token

const loginMiddelware=(req, res, next)=>{
    userData = req.body;
    const token = jwtValidation.loginJwt(userData);
    console.log(token);
    req.token = token;
    next()
}



module.exports = {data, updateMiddelware, loginMiddelware}
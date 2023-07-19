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


//JWT login Token

const loginMiddelware=(req, res, next)=>{
    userData = req.body;
    const token = jwtValidation.loginJwt(userData);
    console.log(token);
    req.token = token;
    next()
}

//JWT verify Token

const jwtVerification = (req, res, next)=>{
    userToken = req.headers['authorization']
    
    if(typeof userToken == 'undefined'){
        // res.send(userToken)
        res.json({
            
            message:"Invalid Token"
        })
    }
    else{
        const verifiedToken = jwtValidation.verifyToken(userToken);
        if(verifiedToken.error){
            res.send("Enter valid Token");
        }
        else{
            next();
        }
    }
}



module.exports = {data, updateMiddelware, loginMiddelware, jwtVerification}
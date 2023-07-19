const joiValidations = require("../utils/joiUtils");
const jwtValidation = require("../utils/jwtUtils");


/**
 * Middelware for data regestration 
 */

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



/**
 * Middelware for update data regestration 
 */

const updateMiddelware=(req, res, next)=>{
	dataUpdate = req.body;
    response = joiValidations.joiUpdateUtils(dataUpdate);
    if(response.error){
        res.json({
            status:412,
            msg:response.error.details[0].message});
    }
    else{
        userToken = req.headers['authorization']
    
    if(typeof userToken == 'undefined'){
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
            req.data = verifiedToken;      /**This is for updation  */
            next();
        }
    }
    }
}



/**
 * Middelware for user login 
 */

const loginMiddelware=async(req, res, next)=>{
    userData = req.body;
    const token = await jwtValidation.loginJwt(userData);
    // console.log(token);
    req.token = token;
    next()
}


/**
 * Middelware for token verification data regestration 
 */

const jwtVerification = async(req, res, next)=>{
    userToken = req.headers['authorization']
    
    if(typeof userToken == 'undefined'){
        res.json({
            message:"Invalid Token"
        })
    }
    else{
        const verifiedToken = await jwtValidation.verifyToken(userToken);
        if(verifiedToken.error){
            res.send("Enter valid Token");
        }
        else{
            next();
        }
    }
}



module.exports = {data, updateMiddelware, loginMiddelware, jwtVerification}
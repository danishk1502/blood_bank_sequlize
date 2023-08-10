
const jwtValidation = require("../utils/jwtUtils");
const jwt = require('jsonwebtoken');



/****************************
 * Middelware for user login 
 ****************************/

const loginMiddelware = async (req, res, next) => {
    const userData = req.body;
    const token = await jwtValidation.loginJwt(userData);
    req.token = token;
    next()
}


/******************************************************
 * Middelware for token verification data regestration 
 ******************************************************/

const jwtVerification = async (req, res, next) => {
    const userToken = req.headers['authorization']
    if (typeof userToken == "undefined") {
        return res.json({
            message: "Invalid Token here"
        })
    }
    else {
        const verifiedToken = await jwtValidation.verifyToken(userToken);
        if (verifiedToken instanceof jwt.JsonWebTokenError || verifiedToken == undefined) {
            return res.json({
                "message": "Invalid Token here"
            })
        }
        else {
            req.data = verifiedToken;
            next();
        }
    }
}




//Role base Middelware for user

const userRoleMiddelware = async (req, res, next) => {
    const token = req.data.id;
    const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
    if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
        return res.json({
            "message": "Invalid Token here"
        })
    }
    if (!findRole) { return res.send("user not found") }
    if (findRole.role != "user") { return res.send("You dont have access") }
    next();
}

//Role base Middelware for blood_bank
const bloodBankRoleMiddelware = async (req, res, next) => {
    const token = req.data;
    const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
    if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
        return res.json({
            "message": "Invalid Token here"
        })
    }
    if (!findRole) { return res.send("user not found") }
    if (findRole.role != "blood_bank" || findRole.user_status != "Active") { return res.send("You dont have access") }
    next();

}


//Role base Middelware for superuser
const superuserRoleMiddelware = async (req, res, next) => {
    const token = req.data;
    const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
    if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
        return res.json({
            "message": "Invalid Token here"
        })
    }
    if (!findRole) { return res.send("user not found") }
    if (findRole.role != "superuser") { return res.send("You dont have access") }
    next();
}


module.exports = { loginMiddelware, superuserRoleMiddelware, jwtVerification, bloodBankRoleMiddelware, userRoleMiddelware }
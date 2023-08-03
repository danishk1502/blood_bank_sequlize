const { response } = require("express");
const joiValidations = require("../utils/joiUtils");
const jwtValidation = require("../utils/jwtUtils");
const jwt = require('jsonwebtoken');



/**
 * Middelware for user login 
 */

const loginMiddelware = async (req, res, next) => {
    userData = req.body;
    const token = await jwtValidation.loginJwt(userData);
    req.token = token;
    next()
}


/**
 * Middelware for token verification data regestration 
 */

const jwtVerification = async (req, res, next) => {
    userToken = req.headers['authorization']
    if (typeof userToken == undefined) {
        return   res.json({
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



module.exports = { loginMiddelware, jwtVerification }
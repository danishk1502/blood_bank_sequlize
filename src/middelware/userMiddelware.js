const joiValidations = require("../utils/joiUtils");
const jwtValidation = require("../utils/jwtUtils");
const jwt = require('jsonwebtoken');


/**
 * Middelware for data regestration 
 */

const data = (req, res, next) => {
    user = req.body;
    response = joiValidations.joiUtils(user);
    if (response.error) {
        res.json({
            status: 412,
            msg: response.error.details[0].message
        });
    }
    else {
        next();
    }
}



/**
 * Middelware for update data regestration 
 */

const updateMiddelware = async (req, res, next) => {
    dataUpdate = req.body;
    response = await joiValidations.joiUpdateUtils(dataUpdate);
    if (response.error) {
        res.json({
            status: 412,
            msg: response.error.details[0].message
        });
    }
    else {
        userToken = req.headers['authorization'];

        if (typeof userToken == 'undefined') {
            res.json({
                message: "Invalid Token"
            })
        }
        else {
            const verifiedToken = await jwtValidation.verifyToken(userToken);
            if (verifiedToken instanceof jwt.JsonWebTokenError || verifiedToken==undefined) {
                res.json({
                    "message": "Invalid Token here"
                })
            }
            else {
               req.data=verifiedToken;
                next();
            }
        }
    }
}



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
        res.json({
            message: "Invalid Token here"
        })
    }
    else {
        const verifiedToken = await jwtValidation.verifyToken(userToken);
        if (verifiedToken instanceof jwt.JsonWebTokenError || verifiedToken==undefined) {
            res.json({
                "message": "Invalid Token here"
            })
        }
        else {
           req.data=verifiedToken;
            next();
        }
    }
}



module.exports = { data, updateMiddelware, loginMiddelware, jwtVerification }
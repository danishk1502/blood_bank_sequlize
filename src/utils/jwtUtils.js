const jwt = require('jsonwebtoken');
const secretKey = "ThisismysecretKey"
const fetchId = require("../services/userServices")

exports.loginJwt= async (userData)=>{
    const dataId = await fetchId.findUsername(userData.username);
    const token = await jwt.sign({id:dataId.id, username:dataId.username, email:dataId.email},  secretKey, {expiresIn:"600s"});
    return token;
}



exports.verifyToken = (userToken)=>{
    return jwt.verify(userToken, secretKey);
}
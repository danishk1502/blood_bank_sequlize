const jwt = require('jsonwebtoken');
const secretKey = "ThisismysecretKey"
const fetchId = require("../services/userServices")

exports.loginJwt= async (userData)=>{

    try{
        const dataId = await fetchId.findUsername(userData.username);
        if(dataId==null){
            return "username doesn't exist";
        }
        else{
            const token = await jwt.sign({id:dataId.id, username:dataId.username},  secretKey, {expiresIn:"300s"});
            return token;
        }
    }
    catch(error){
        throw error;
    }
}



exports.verifyToken = (userToken)=>{
    return jwt.verify(userToken, secretKey);
}
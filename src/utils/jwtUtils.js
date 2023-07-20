const jwt = require('jsonwebtoken');
const secretKey = "ThisismysecretKey"
const fetchId = require("../services/userServices")

exports.loginJwt= async (userData)=>{
        const dataId = await fetchId.findUsername(userData.username);
        if(dataId==null){
            return "username doesn't exist";
        }
        else{
            const token = jwt.sign({id:dataId.id, username:dataId.username},  secretKey, {expiresIn:"600sec"});
            return token;
        }
    }


exports.verifyToken = (userToken)=>{
    try {
	const tokenVerification = jwt.verify(userToken, secretKey)
    return tokenVerification;
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return e;
		}
    }
}
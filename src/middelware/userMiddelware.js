const joiValidations = require("../utils/joiUtils");


//Middelware for user registration 

const data=(req, res, next)=>{
	user = req.body;
    response = joiValidations(user);
    if(response.error){
        res.send(response.error.details[0].message);
    }
    else{
        next();
    }
}

module.exports = data
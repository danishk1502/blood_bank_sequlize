const Joi = require('joi')

//User-defined function to validate the user
function validateUser(user)
{
	const JoiSchema = Joi.object({
	
		username: Joi.string()
				.min(5)
				.max(30)
				.required(),
					
		email: Joi.string()
			.email()
			.min(5)
			.max(50)
			.optional(),
				
		
	}).options({ abortEarly: false });

	return JoiSchema.validate(user)
}





//Middelware for user registration 

const data=(req, res, next)=>{
   
    response = validateUser({username:req.body.username, email:req.body.email});
    if(response.error){
        res.send("put valid data");
    }
    else{
        next();
    }
}

module.exports = data
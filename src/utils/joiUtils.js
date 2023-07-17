const Joi = require('joi')

//User-defined function to validate the user
const joiUtils = (user)=>
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

		name: Joi.string()
			.min(3)
			.max(40)
			.required(),

		lname: Joi.string()
			.min(3)
			.max(40)
			.required(),

		state: Joi.string()
			.max(15)
			.required(),
			
		distt: Joi.string()
			.max(15)
			.required(),

		password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),			
	}).options({ abortEarly: false });
	

	return JoiSchema.validate(user)
}
module.exports = joiUtils

const Joi = require('joi')

//User-defined function to validate the user


const joiUtils = ((user)=>
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
			.required(),

		name: Joi.string()
			.min(3)
			.max(40)
			.required(),
			
		role: Joi.string()
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
})




//function to validate the user while update 

const joiUpdateUtils = (dataUpdate)=>
{
	const JoiSchema = Joi.object({
	
		username: Joi.string()
				.min(5)
				.max(30)
				.optional()
				.allow(null),
					
		email: Joi.string()
			.email()
			.min(5)
			.max(50)
			.optional()
			.allow(null),

		name: Joi.string()
			.min(3)
			.max(40)
			.optional()
			.allow(null),

		lname: Joi.string()
			.min(3)
			.max(40)
			.optional()
			.allow(null),

		state: Joi.string()
			.max(15)
			.optional()
			.allow(null),
			
		distt: Joi.string()
			.max(15)
			.optional()
			.allow(null),

		password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),			
	}).options({ abortEarly: false });
	return JoiSchema.validate(dataUpdate)
}



module.exports = {joiUtils, joiUpdateUtils}

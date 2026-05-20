import Joi from "joi";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

const registerSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).messages({
        "string.base": "Name should be valid string",
        "string.min": "Name must be at least 3 letters",
        "string.max": "Name must be at most 100 letter",
        "string.empty": "Name cannot be empty",
        "any.required": "Name Cant bu empty"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be valid string",
        "string.email": "Email must be valid",
        "string.empty": "Email cannot be empty",
        "any.required": "Email Cant by empty"
    }),
    password: Joi.string().required().pattern(passwordRegex).min(8).max(100).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 charecters',
        'string.max': 'Password must be at most 100 charecter',
        'string.pattern.base': 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.pattern.base': 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
        'any.required': 'Password is required',
        "any.only": "passwords shoumd match"
    })
})

export default registerSchema
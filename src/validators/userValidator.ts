import Joi from 'joi';

export const userValidator = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email is required',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be Male or Female',
    'any.required': 'Gender is required',
    'string.empty': 'Gender is required',
  }),
  role: Joi.string().valid('patient', 'researcher').required().messages({
    'any.only': 'role should patient or researcher',
    'any.required': 'role is required',
    'string.empty': 'role is required',
  }),
});


import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';

export const createStudentValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    'any.required': "It's required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    'any.required': "It's required",
  }),
  age: Joi.number().integer().min(6).max(17).required().messages({
    'number.min': 'Too low: {#label} - {#value}!',
    'number.max': 'Too large: {#label} - {#value}!',
  }),
  avgMark: Joi.number().min(1).max(12).required(),
  gender: Joi.string()
    .valid(...Object.values(GENDERS))
    .required(),
  onDuty: Joi.bool(),
});

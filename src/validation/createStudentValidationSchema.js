import Joi from 'joi';
import {
  ageValidation,
  avgMarkValidation,
  genderValidation,
} from './helpers.js';

export const createStudentValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    'any.required': "It's required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    'any.required': "It's required",
  }),
  age: ageValidation().required().messages({
    'number.min': 'Too low: {#label} - {#value}!',
    'number.max': 'Too large: {#label} - {#value}!',
  }),
  avgMark: avgMarkValidation().required(),
  gender: genderValidation().required(),
  onDuty: Joi.bool(),
});

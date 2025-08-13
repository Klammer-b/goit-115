import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';

export const patchStudentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(6).max(17),
  avgMark: Joi.number().min(1).max(12),
  gender: Joi.string().valid(...Object.values(GENDERS)),
  onDuty: Joi.bool(),
});

import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';
import {
  ageValidation,
  avgMarkValidation,
  objectIdValidation,
} from './helpers.js';

export const patchStudentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: ageValidation(),
  avgMark: avgMarkValidation(),
  gender: Joi.string().valid(...Object.values(GENDERS)),
  onDuty: Joi.bool(),
  parentId: objectIdValidation(),
});

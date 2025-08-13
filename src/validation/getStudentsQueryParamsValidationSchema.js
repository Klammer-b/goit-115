import Joi from 'joi';
import {
  ageValidation,
  avgMarkValidation,
  genderValidation,
} from './helpers.js';

export const getStudentsQueryParamsValidationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  perPage: Joi.number().min(1).max(100).default(10),
  sortBy: Joi.string().valid('_id', 'avgMark', 'age').default('_id'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  minAvgMark: avgMarkValidation(),
  maxAvgMark: avgMarkValidation(),
  minAge: ageValidation(),
  maxAge: ageValidation(),
  onDuty: Joi.bool(),
  gender: genderValidation(),
});

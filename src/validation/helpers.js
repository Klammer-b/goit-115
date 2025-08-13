import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';

export const avgMarkValidation = () => Joi.number().min(1).max(12);
export const ageValidation = () => Joi.number().integer().min(6).max(17);
export const genderValidation = () =>
  Joi.string().valid(...Object.values(GENDERS));

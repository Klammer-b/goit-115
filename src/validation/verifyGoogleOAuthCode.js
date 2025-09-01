import Joi from 'joi';

export const verifyGoogleOAUthCodeValidationSchema = Joi.object({
  code: Joi.string().required(),
});

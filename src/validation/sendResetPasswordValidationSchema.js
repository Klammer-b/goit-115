import Joi from 'joi';

export const sendResetPasswordValidationSchema = Joi.object({
  email: Joi.string().required().email(),
});

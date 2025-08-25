import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  // .max(30)
  // .regex(/.*[A-Z].*/, { name: 'One uppercase' })
  // .regex(/.*[a-z].*/)
  // .regex(/^(?=.*[@#$%^&*()]).+$/),
});

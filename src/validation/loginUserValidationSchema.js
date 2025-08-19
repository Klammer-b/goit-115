import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  // .max(30)
  // .regex(/.*[A-Z].*/, { name: 'One uppercase' })
  // .regex(/.*[a-z].*/)
  // .regex(/^(?=.*[@#$%^&*()]).+$/),
});

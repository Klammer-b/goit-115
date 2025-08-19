import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBodyMiddleware.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);
// authRouter.post('/auth/refresh-session');

export default authRouter;

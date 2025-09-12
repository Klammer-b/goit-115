import { Router } from 'express';
import {
  getGoogleOAuthSignInLinkController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  resetPasswordController,
  sendResetPasswordEmailController,
  verifyGoogleOAuthCodeController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBodyMiddleware.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { sendResetPasswordValidationSchema } from '../validation/sendResetPasswordValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';
import { verifyGoogleOAUthCodeValidationSchema } from '../validation/verifyGoogleOAuthCode.js';

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
authRouter.post('/auth/refresh-session', refreshSessionController);
authRouter.post(
  '/auth/send-reset-password-email',
  validateBody(sendResetPasswordValidationSchema),
  sendResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-password',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);
authRouter.post(
  '/auth/get-google-oauth-url',
  getGoogleOAuthSignInLinkController,
);
authRouter.post(
  '/auth/verify-google-oauth-code',
  validateBody(verifyGoogleOAUthCodeValidationSchema),
  verifyGoogleOAuthCodeController,
);

export default authRouter;

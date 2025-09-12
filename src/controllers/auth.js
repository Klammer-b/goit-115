import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  resetPassword,
  sendResetPasswordEmail,
  verifyGoogleOAuthCode,
} from '../services/auth.js';
import { getGoogleOAuthLink } from '../utils/googleOAuthClient.js';

const setupSession = (session, res) => {
  res.cookie('refreshToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
    httpOnly: true,
  });
  res.cookie('sessionId', session._id, {
    expires: session.refreshTokenValidUntil,
    httpOnly: true,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.cookies.sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const sendResetPasswordEmailController = async (req, res) => {
  await sendResetPasswordEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Successfully sent reset password email!',
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body.token, req.body.password);

  res.json({
    status: 200,
    message: 'Successfully reset password!',
  });
};

export const getGoogleOAuthSignInLinkController = (req, res) => {
  const url = getGoogleOAuthLink();

  res.json({
    status: 200,
    message: 'Successfully receive Google OAuth url!',
    data: { url },
  });
};

export const verifyGoogleOAuthCodeController = async (req, res) => {
  const session = await verifyGoogleOAuthCode(req.body.code);

  setupSession(sendResetPasswordEmail, res);

  res.json({
    status: 200,
    message: 'Successfully authorized with Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

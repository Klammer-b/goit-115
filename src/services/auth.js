import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'User with this email already registered!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User with given credentials does not exist!');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(404, 'User with given credentials does not exist!');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await Session.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), //15 min
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days
    userId: user._id,
  });

  return session;
};

export const logoutUser = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId);
};

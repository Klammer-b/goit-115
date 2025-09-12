import { OAuth2Client } from 'google-auth-library';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import createHttpError from 'http-errors';

const client = new OAuth2Client({
  projectId: getEnvVar(ENV_VARS.GOOGLE_OAUTH_PROJECT_ID),
  clientId: getEnvVar(ENV_VARS.GOOGLE_OAUTH_CLIENT_ID),
  clientSecret: getEnvVar(ENV_VARS.GOOGLE_OAUTH_CLIENT_SECRET),
  redirectUri: getEnvVar(ENV_VARS.GOOGLE_OAUTH_REDIRECT_URI),
});

export const getGoogleOAuthLink = () =>
  client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    access_type: 'offline',
  });

export const getAuthData = async (code) => {
  try {
    const { tokens } = await client.getToken(code);

    const idToken = tokens.id_token;

    if (!idToken) {
      throw createHttpError(401, 'Id Token not found!');
    }

    const userData = await client.verifyIdToken({
      idToken: idToken,
    });

    return userData.getPayload();
  } catch (err) {
    console.error(err);

    throw createHttpError(401, 'Failed to authorize user with Google OAuth');
  }
};

import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_FILES_DIR_PATH } from '../constants/path.js';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import createHttpError from 'http-errors';

export const saveFileToLocal = async (file) => {
  try {
    const newPath = path.join(UPLOAD_FILES_DIR_PATH, file.filename);
    await fs.rename(file.path, newPath);
    return `${getEnvVar(ENV_VARS.BACKEND_DOMAIN)}/uploads/${file.filename}`;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to save file to local');
  }
};

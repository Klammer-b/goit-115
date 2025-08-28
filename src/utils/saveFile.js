import createHttpError from 'http-errors';
import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToLocal } from './saveFileToLocal.js';

const saveFileStrategyMapper = {
  cloudinary: saveFileToCloudinary,
  local: saveFileToLocal,
};

export const saveFile = async (file) => {
  const strategyName = getEnvVar(ENV_VARS.FILE_STORAGE_STRATEGY);
  const saveFileStrategy = saveFileStrategyMapper[strategyName];

  if (!saveFileStrategy) {
    throw new createHttpError(
      500,
      `No strategy with name ${strategyName} provided`,
    );
  }

  return await saveFileStrategy(file);
};

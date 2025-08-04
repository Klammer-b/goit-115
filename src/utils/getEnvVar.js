import 'dotenv/config';

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];

  if (!value && !defaultValue) {
    throw new Error(`Env var with name ${name} is not set!`);
  }

  if (value) {
    return value;
  }

  return defaultValue;
};

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import router from './routes/index.js';
import { requestIdMiddleware } from './middlewares/requestIdMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

export const startServer = () => {
  const app = express();

  app.use([requestIdMiddleware, pino(), cors()]);

  app.use(router);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT} port!`);
  });
};

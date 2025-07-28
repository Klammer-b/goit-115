import express from 'express';
import crypto from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';

const app = express();

// middleware
app.use([
  (req, res, next) => {
    req.id = crypto.randomUUID();
    next();
  },
  pino(),
  cors(),
]);

// controller
app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Hello world!',
    id: req.id,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found!',
    status: 404,
  });
});

app.use('/', (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: 'Oops error happened in application!',
    error: err.message,
  });
});

const PORT = getEnvVar(ENV_VARS.PORT, 3000);
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT} port!`);
});

import express from 'express';
import crypto from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { getStudentById, getStudents } from './service/students.js';

export const startServer = () => {
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

  app.get('/students', async (req, res) => {
    const students = await getStudents();
    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Student with ${studentId} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
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
};

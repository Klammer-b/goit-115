import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

export default studentsRouter;

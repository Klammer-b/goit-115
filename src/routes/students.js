import { Router } from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentController,
  upsertStudentController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.post('/students', createStudentController);

studentsRouter.patch('/students/:studentId', updateStudentController);

studentsRouter.put('/students/:studentId', upsertStudentController);

studentsRouter.delete('/students/:studentId', deleteStudentByIdController);

export default studentsRouter;

import { Router } from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBodyMiddleware.js';
import { createStudentValidationSchema } from '../validation/createStudentValidationSchema.js';
import { patchStudentValidationSchema } from '../validation/patchStudentValidationSchema.js';
import { validateParams } from '../middlewares/isValidObjectIdMiddleware.js';
import { validateQuery } from '../middlewares/validateQueryMiddleware.js';
import { getStudentsQueryParamsValidationSchema } from '../validation/getStudentsQueryParamsValidationSchema.js';

const studentsRouter = Router();
studentsRouter.use('/students/:studentId', validateParams('studentId'));

studentsRouter.get(
  '/students',
  validateQuery(getStudentsQueryParamsValidationSchema),
  getStudentsController,
);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.post(
  '/students',
  validateBody(createStudentValidationSchema),
  createStudentController,
);

studentsRouter.patch(
  '/students/:studentId',
  validateBody(patchStudentValidationSchema),
  updateStudentController,
);

studentsRouter.put(
  '/students/:studentId',
  validateBody(createStudentValidationSchema),
  upsertStudentController,
);

studentsRouter.delete('/students/:studentId', deleteStudentByIdController);

export default studentsRouter;

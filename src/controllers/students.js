import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudent,
  upsertStudent,
} from '../services/students.js';
import { USER_ROLES } from '../constants/roles.js';

const buildStudentFilters = (query) => ({
  minAvgMark: query.minAvgMark,
  maxAvgMark: query.maxAvgMark,
  minAge: query.minAge,
  maxAge: query.maxAge,
  onDuty: query.onDuty,
  gender: query.gender,
});

export const getStudentsController = async (req, res) => {
  const filters = buildStudentFilters(req.validatedQuery);

  if (req.user.role === USER_ROLES.PARENT) {
    filters.parentId = req.user._id;
  }

  const studentsData = await getStudents({
    page: req.validatedQuery.page,
    perPage: req.validatedQuery.perPage,
    sortBy: req.validatedQuery.sortBy,
    sortOrder: req.validatedQuery.sortOrder,
    filters,
  });

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: studentsData,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, `Student with ${studentId} not found!`);
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent({
    ...req.body,
    parentId: req.body.parentId ?? req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const updateStudentController = async (req, res) => {
  const { studentId } = req.params;
  const student = await updateStudent(studentId, req.body);

  if (!student) {
    throw createHttpError(404, 'Student not found!');
  }

  res.json({
    status: 200,
    message: `Successfully updated a student with id ${studentId}!`,
    data: student,
  });
};

export const upsertStudentController = async (req, res) => {
  const { studentId } = req.params;

  const { isNew, student } = await upsertStudent(studentId, {
    ...req.body,
    parentId: req.body.parentId ?? req.user._id,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  await deleteStudentById(studentId);

  res.status(204).send();
};

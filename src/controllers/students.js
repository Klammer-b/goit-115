import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudent,
  upsertStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getStudents();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
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
  const student = await createStudent(req.body);

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

  const { isNew, student } = await upsertStudent(studentId, req.body);

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

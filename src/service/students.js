import { Student } from '../db/models/student.js';

export const getStudents = async () => {
  const students = await Student.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  return student;
};

import { Student } from '../db/models/student.js';

export const getStudents = async () => {
  const students = await Student.find();

  return students;
};

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const student = await Student.create(payload);

  return student;
};

export const updateStudent = async (studentId, payload) => {
  const student = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
  });

  return student;
};

export const upsertStudent = async (studentId, payload) => {
  const student = await getStudentById(studentId);
  if (!student) {
    const student = await Student.create({ _id: studentId, ...payload });

    return {
      isNew: true,
      student,
    };
  } else {
    const student = await updateStudent(studentId, payload);

    return {
      isNew: false,
      student,
    };
  }
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};

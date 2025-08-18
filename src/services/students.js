import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

const createPaginationMetadata = (page, perPage, itemsCount) => {
  const totalPagesCount = Math.ceil(itemsCount / perPage);

  if (page > totalPagesCount && totalPagesCount !== 0) {
    throw createHttpError(
      400,
      `Invalid page count, max available page is ${totalPagesCount}`,
    );
  }

  return {
    page,
    perPage,
    totalItemsCount: itemsCount,
    totalPagesCount,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPagesCount,
  };
};

export const getStudents = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = perPage * (page - 1);
  const studentsConditions = Student.find();

  if (filters.minAvgMark) {
    studentsConditions.where('avgMark').gte(filters.minAvgMark);
  }

  if (filters.maxAvgMark) {
    studentsConditions.where('avgMark').lte(filters.maxAvgMark);
  }

  if (filters.minAge) {
    studentsConditions.where('age').gte(filters.minAge);
  }

  if (filters.maxAge) {
    studentsConditions.where('age').lte(filters.maxAge);
  }

  if (filters.gender) {
    studentsConditions.where('gender').equals(filters.gender);
  }

  if (typeof filters.onDuty === 'boolean') {
    studentsConditions.where('onDuty').equals(filters.onDuty);
  }

  const [students, studentsCount] = await Promise.all([
    Student.find()
      .merge(studentsConditions)
      .limit(perPage)
      .skip(skip)
      .sort({ [sortBy]: sortOrder }),
    Student.find().merge(studentsConditions).countDocuments(),
  ]);

  return {
    students,
    ...createPaginationMetadata(page, perPage, studentsCount),
  };
};

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const { firstName, lastName, ...rest } = payload;
  const student = await Student.create({
    ...rest,
    name: `${firstName} ${lastName}`,
  });
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

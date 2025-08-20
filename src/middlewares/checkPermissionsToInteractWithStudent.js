import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';
import { USER_ROLES } from '../constants/roles.js';

export const checkPermissionsToInteractWithStudent = async (req, res, next) => {
  if (req.user.role === USER_ROLES.TEACHER) {
    return next();
  }

  if (req.user.role === USER_ROLES.PARENT) {
    const student = await Student.findById(req.params.studentId);

    if (!student?.parentId?.equals(req.user._id)) {
      throw createHttpError(403, "It's not your child!");
    }

    return next();
  }

  throw createHttpError(403, `Unknown role: ${req.user.role}`);
};

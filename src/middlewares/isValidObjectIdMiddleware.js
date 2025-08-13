import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateParams =
  (id = 'id') =>
  (req, res, next) => {
    if (isValidObjectId(req.params[id])) {
      return next();
    }

    throw createHttpError(400, `Invalid objectId in path ${id}`);
  };

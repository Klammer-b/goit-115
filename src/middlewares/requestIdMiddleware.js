import crypto from 'node:crypto';

export const requestIdMiddleware = (req, res, next) => {
  req.id = crypto.randomUUID();
  next();
};

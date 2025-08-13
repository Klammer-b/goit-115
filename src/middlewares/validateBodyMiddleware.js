export const validateBody = (schema) => async (req, res, next) => {
  await schema.validateAsync(req.body, {
    allowUnknown: false,
    abortEarly: false,
    convert: false,
  });
  next();
};

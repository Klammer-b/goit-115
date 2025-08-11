export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    message: 'Route not found!',
    status: 404,
  });
};

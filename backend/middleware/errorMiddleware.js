export const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: "Not Found" });
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};

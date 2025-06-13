import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  statusCode: number;
  message: string;
  stack?: string;
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response: ErrorResponse = {
    statusCode,
    message,
  };

  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;

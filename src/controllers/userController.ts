import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  registerUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/userService";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed",
    });
    return;
  }
  try {
    const result = await registerUserService(req.body);
    if (result.success) {
      res.status(result.statusCode).json(result);
    } else {
      res.status(result.statusCode).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed",
    });
    return;
  }
  try {
    const result = await loginUserService(req.body);
    if (result.success) {
      res.status(result.statusCode).json(result);
    } else {
      res.status(result.statusCode).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllUsersService();
    if (result.success) {
      res.status(result.statusCode).json(result);
    } else {
      res.status(result.statusCode).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed",
    });
    return;
  }
  try {
    const result = await getUserByIdService(req.params.id);
    if (result.success) {
      res.status(result.statusCode).json(result);
    } else {
      res.status(result.statusCode).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed",
    });
    return;
  }
  try {
    const result = await registerUserService(req.body);
    if (result.success) {
      res.status(result.statusCode).json(result);
    } else {
      res.status(result.statusCode).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

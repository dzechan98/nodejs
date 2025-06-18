import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  getAllUsersService,
  getUserByIdService,
} from "../services/userService";

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

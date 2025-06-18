import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  refreshTokenService,
  registerUserService,
  loginUserService,
} from "../services/authService";

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
    res.status(result.statusCode).json(result);
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
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "An unexpected error occurred in the controller",
    });
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    const result = await refreshTokenService(refreshToken);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred in the controller",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

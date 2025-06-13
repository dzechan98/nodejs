import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import config from "../config";

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "30d",
  });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const user = await User.create({
      username,
      email,
      passwordHash: password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: (user as any)._id,
          username: user.username,
          email: user.email,
          token: generateToken((user as any)._id.toString()),
        },
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to register user",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        data: {
          _id: (user as any)._id,
          username: user.username,
          email: user.email,
          token: generateToken((user as any)._id.toString()),
        },
        message: "User logged in successfully",
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to login user",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find({}).select("-passwordHash");
    res.json({
      success: true,
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to retrieve users",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (user) {
      res.json({
        success: true,
        data: user,
        message: "User retrieved successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to retrieve user",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  registerUser(req, res);
};

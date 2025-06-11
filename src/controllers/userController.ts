import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { v4 as uuidv4 } from "uuid";

const users: IUser[] = [
  new User(uuidv4(), "johndoe", "john.doe@example.com"),
  new User(uuidv4(), "janedoe", "jane.doe@example.com"),
];

export const getAllUsers = (req: Request, res: Response): void => {
  try {
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

export const getUserById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
        message: `No user found with ID ${id}`,
      });
      return;
    }

    res.json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to retrieve user",
    });
  }
};

export const createUser = (req: Request, res: Response): void => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "Username and email are required",
      });
      return;
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: "User already exists",
        message: `User with email ${email} already exists`,
      });
      return;
    }

    const newUser = new User(uuidv4(), username, email);
    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to create user",
    });
  }
};

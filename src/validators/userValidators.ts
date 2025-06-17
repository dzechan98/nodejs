import { body, param } from "express-validator";

export const registerUserValidator = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("username").notEmpty().withMessage("Username is required"),
];

export const loginUserValidator = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const getUserByIdValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

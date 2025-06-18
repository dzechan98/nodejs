import { body, param } from "express-validator";

export const createReviewValidator = [
  body("book").isMongoId().withMessage("Valid Book ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),
  body("comment").optional().isString().withMessage("Comment must be a string"),
];

export const getReviewsByBookValidator = [
  param("bookId").isMongoId().withMessage("Invalid book ID"),
];

export const updateReviewValidator = [
  param("id").isMongoId().withMessage("Invalid review ID"),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),
  body("comment").optional().isString().withMessage("Comment must be a string"),
];

export const deleteReviewValidator = [
  param("id").isMongoId().withMessage("Invalid review ID"),
];

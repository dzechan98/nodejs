import { body, param, query } from "express-validator";

export const createBookValidator = [
  body("name").notEmpty().withMessage("Book name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("genre").isMongoId().withMessage("Valid Genre ID is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Valid publication year is required"),
];

export const getBooksValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("genre")
    .optional()
    .isMongoId()
    .withMessage("Valid Genre ID is required for filtering"),
  query("search")
    .optional()
    .isString()
    .withMessage("Search term must be a string"),
  query("sortBy")
    .optional()
    .isString()
    .withMessage("SortBy field must be a string"),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("SortOrder must be 'asc' or 'desc'"),
];

export const getBookByIdValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];

export const updateBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("name").optional().notEmpty().withMessage("Book name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("genre")
    .optional()
    .isMongoId()
    .withMessage("Valid Genre ID is required"),
  body("author").optional().notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Valid publication year is required"),
];

export const deleteBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];

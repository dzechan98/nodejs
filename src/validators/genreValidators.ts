import { body, param, query } from "express-validator";

export const createGenreValidator = [
  body("name").notEmpty().withMessage("Genre name is required"),
];

export const getGenresValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
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

export const getGenreByIdValidator = [
  param("id").isMongoId().withMessage("Invalid genre ID"),
];

export const updateGenreValidator = [
  param("id").isMongoId().withMessage("Invalid genre ID"),
  body("name").optional().notEmpty().withMessage("Genre name is required"),
];

export const deleteGenreValidator = [
  param("id").isMongoId().withMessage("Invalid genre ID"),
];

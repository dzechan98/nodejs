import express, { Router } from "express";
import { body, param } from "express-validator";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("username").notEmpty().withMessage("Username is required"),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);
router.get("/", protect, authorize("admin"), getAllUsers);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid user ID")],
  protect,
  getUserById
);

export default router;

import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  registerUserValidator,
  loginUserValidator,
  getUserByIdValidator,
} from "../validators/userValidators";

const router: Router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/:id", getUserByIdValidator, protect, getUserById);

export default router;

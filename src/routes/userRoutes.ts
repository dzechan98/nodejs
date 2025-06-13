import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/:id", protect, getUserById);

export default router;

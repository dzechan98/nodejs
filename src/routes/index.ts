import express, { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import bookRoutes from "./bookRoutes";
import genreRoutes from "./genreRoutes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/genres", genreRoutes);

export default router;

import express, { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import bookRoutes from "./bookRoutes";
import genreRoutes from "./genreRoutes";
import reviewRoutes from "./reviewRoutes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/genres", genreRoutes);
router.use("/reviews", reviewRoutes);

export default router;

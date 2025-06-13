import express, { Router } from "express";
import userRoutes from "./userRoutes";

const router: Router = express.Router();

router.use("/users", userRoutes);

export default router;

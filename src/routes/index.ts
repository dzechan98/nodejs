import express, { Request, Response, Router } from "express";
import { getHome } from "../controllers/homeController";
import userRoutes from "./userRoutes";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  getHome(req, res);
});

router.use("/users", userRoutes);

export default router;

import { Router } from "express";
import {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(protect, authorize("admin"), createGenre).get(getGenres);

router
  .route("/:id")
  .get(getGenreById)
  .put(protect, authorize("admin"), updateGenre)
  .delete(protect, authorize("admin"), deleteGenre);

export default router;

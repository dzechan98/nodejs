import { Router } from "express";
import {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  createGenreValidator,
  getGenresValidator,
  getGenreByIdValidator,
  updateGenreValidator,
  deleteGenreValidator,
} from "../validators/genreValidators";

const router = Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createGenreValidator,
  createGenre
);

router.get("/", getGenresValidator, getGenres);

router.get("/:id", getGenreByIdValidator, getGenreById);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateGenreValidator,
  updateGenre
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteGenreValidator,
  deleteGenre
);

export default router;

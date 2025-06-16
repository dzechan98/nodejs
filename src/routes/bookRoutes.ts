import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(protect, authorize("admin"), createBook).get(getBooks);

router
  .route("/:id")
  .get(getBookById)
  .put(protect, authorize("admin"), updateBook)
  .delete(protect, authorize("admin"), deleteBook);

export default router;

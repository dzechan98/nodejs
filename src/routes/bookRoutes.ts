import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  createBookValidator,
  getBooksValidator,
  getBookByIdValidator,
  updateBookValidator,
  deleteBookValidator,
} from "../validators/bookValidators";

const router = Router();

router.post("/", protect, authorize("admin"), createBookValidator, createBook);

router.get("/", getBooksValidator, getBooks);

router.get("/:id", getBookByIdValidator, getBookById);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateBookValidator,
  updateBook
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBookValidator,
  deleteBook
);

export default router;

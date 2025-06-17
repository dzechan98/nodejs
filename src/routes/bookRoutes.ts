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

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post("/", protect, authorize("admin"), createBookValidator, createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or author
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", getBooksValidator, getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get("/:id", getBookByIdValidator, getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update the book by the id
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateBookValidator,
  updateBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBookValidator,
  deleteBook
);

export default router;

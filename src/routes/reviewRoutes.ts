import { Router } from "express";
import {
  createReview,
  getReviewsByBook,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";
import {
  createReviewValidator,
  getReviewsByBookValidator,
  updateReviewValidator,
  deleteReviewValidator,
} from "../validators/reviewValidators";

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: The review was successfully created
 *       404:
 *         description: Book not found
 */
router.post("/", protect, createReviewValidator, createReview);

/**
 * @swagger
 * /api/reviews/book/{bookId}:
 *   get:
 *     summary: Get all reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of reviews
 */
router.get("/book/:bookId", getReviewsByBookValidator, getReviewsByBook);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: The review was updated
 *       403:
 *         description: User not authorized
 *       404:
 *         description: Review not found
 */
router.put("/:id", protect, updateReviewValidator, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The review was deleted
 *       403:
 *         description: User not authorized
 *       404:
 *         description: Review not found
 */
router.delete("/:id", protect, deleteReviewValidator, deleteReview);

export default router;

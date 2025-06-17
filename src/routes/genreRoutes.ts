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

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: The genre was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createGenreValidator,
  createGenre
);

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Returns the list of all the genres
 *     tags: [Genres]
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
 *     responses:
 *       200:
 *         description: The list of the genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
router.get("/", getGenresValidator, getGenres);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get the genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     responses:
 *       200:
 *         description: The genre description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: The genre was not found
 */
router.get("/:id", getGenreByIdValidator, getGenreById);

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Update the genre by the id
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The genre was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: The genre was not found
 *       500:
 *         description: Some error happened
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateGenreValidator,
  updateGenre
);

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Remove the genre by id
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     responses:
 *       200:
 *         description: The genre was deleted
 *       404:
 *         description: The genre was not found
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteGenreValidator,
  deleteGenre
);

export default router;

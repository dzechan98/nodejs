import mongoose, { Document, Schema } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the genre
 *         name:
 *           type: string
 *           description: The name of the genre
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the genre was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the genre was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109cb
 *         name: "Fantasy"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */
const GenreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGenre>("Genre", GenreSchema);

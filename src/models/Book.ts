import mongoose, { Document, Schema } from "mongoose";
import { IGenre } from "./Genre";

export interface IBook extends Document {
  name: string;
  description: string;
  imageUrl: string;
  genre: IGenre["_id"];
  author: string;
  publicationYear: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - imageUrl
 *         - genre
 *         - author
 *         - publicationYear
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The name of the book
 *         description:
 *           type: string
 *           description: The description of the book
 *         imageUrl:
 *           type: string
 *           description: The URL of the book's image
 *         genre:
 *           type: string
 *           description: The ID of the genre
 *         author:
 *           type: string
 *           description: The author of the book
 *         publicationYear:
 *           type: number
 *           description: The publication year of the book
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: "The Lord of the Rings"
 *         description: "Epic fantasy novel by J.R.R. Tolkien."
 *         imageUrl: "https://example.com/lotr.jpg"
 *         genre: "60d0fe4f5311236168a109cb"
 *         author: "J.R.R. Tolkien"
 *         publicationYear: 1954
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */
const BookSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);

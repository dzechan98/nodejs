import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "./Book";
import { IUser } from "./User";

export interface IReview extends Document {
  book: IBook["_id"];
  user: IUser["_id"];
  rating: number;
  comment: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - book
 *         - user
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         book:
 *           type: string
 *           description: The ID of the book being reviewed
 *         user:
 *           type: string
 *           description: The ID of the user who wrote the review
 *         rating:
 *           type: number
 *           description: The rating given (e.g., 1-5)
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *           description: The review comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was last updated
 *       example:
 *         id: "60d0fe4f5311236168a109cd"
 *         book: "60d0fe4f5311236168a109ca"
 *         user: "60d0fe4f5311236168a109cc"
 *         rating: 5
 *         comment: "This is a fantastic book!"
 *         createdAt: "2023-01-02T00:00:00.000Z"
 *         updatedAt: "2023-01-02T00:00:00.000Z"
 */
const ReviewSchema: Schema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);

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

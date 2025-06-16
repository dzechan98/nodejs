import mongoose, { Document, Schema } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const GenreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGenre>("Genre", GenreSchema);

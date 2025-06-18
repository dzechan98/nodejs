import Review, { IReview } from "../models/Review";
import Book from "../models/Book";

export const createReview = async (reviewData: Partial<IReview>) => {
  const bookExists = await Book.findById(reviewData.book);
  if (!bookExists) {
    throw new Error("Book not found");
  }

  const newReview = new Review(reviewData);
  await newReview.save();
  return newReview;
};

export const getReviewsByBook = async (bookId: string) => {
  const reviews = await Review.find({ book: bookId }).populate(
    "user",
    "username"
  );
  return reviews;
};

export const updateReview = async (
  reviewId: string,
  reviewData: Partial<IReview>
) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, {
    new: true,
    runValidators: true,
  }).populate("user", "username");

  if (!updatedReview) {
    throw new Error("Review not found");
  }

  return updatedReview;
};

export const deleteReview = async (reviewId: string) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  await Review.findByIdAndDelete(reviewId);

  return { message: "Review deleted successfully" };
};

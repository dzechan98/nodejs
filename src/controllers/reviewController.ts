import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
import { AuthRequest } from "../middleware/authMiddleware";
import { IReview } from "../models/Review";

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const userId = (req.user as any)._id.toString();
    const body: IReview = { ...req.body, user: userId };

    const newReview = await reviewService.createReview(body);
    res.status(201).json(newReview);
  } catch (error: any) {
    if (error.message === "Book not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error creating review", error: error.message });
    }
  }
};

export const getReviewsByBook = async (
  req: Request<{ bookId: string }>,
  res: Response
) => {
  try {
    const reviews = await reviewService.getReviewsByBook(req.params.bookId);
    res.status(200).json(reviews);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const userId = (req.user as any)._id.toString();
    const body: IReview = { ...req.body, user: userId };

    const updatedReview = await reviewService.updateReview(req.params.id, body);
    res.status(200).json(updatedReview);
  } catch (error: any) {
    if (
      error.message === "Review not found" ||
      error.message === "User not authorized to update this review"
    ) {
      res
        .status(error.message === "Review not found" ? 404 : 403)
        .json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error updating review", error: error.message });
    }
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const result = await reviewService.deleteReview(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (
      error.message === "Review not found" ||
      error.message === "User not authorized to delete this review"
    ) {
      res
        .status(error.message === "Review not found" ? 404 : 403)
        .json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error deleting review", error: error.message });
    }
  }
};

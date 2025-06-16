import { Request, Response } from "express";
import Genre, { IGenre } from "../models/Genre";

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newGenre: IGenre = new Genre({ name });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: "Error creating genre", error });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error });
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genre", error });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedGenre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }
    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ message: "Error updating genre", error });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting genre", error });
  }
};

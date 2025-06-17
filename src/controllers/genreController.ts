import { Request, Response } from "express";
import * as genreService from "../services/genreService";
import { IGenreQuery } from "../services/genreService";

export const createGenre = async (req: Request, res: Response) => {
  try {
    const newGenre = await genreService.createNewGenre(req.body);
    res.status(201).json(newGenre);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating genre", error: error.message });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const queryParams: IGenreQuery = req.query;
    const result = await genreService.getAllGenres(queryParams);
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching genres", error: error.message });
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await genreService.getGenreDetails(req.params.id);
    res.status(200).json(genre);
  } catch (error: any) {
    if (error.message === "Genre not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error fetching genre", error: error.message });
    }
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const updatedGenre = await genreService.updateExistingGenre(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedGenre);
  } catch (error: any) {
    if (error.message === "Genre not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error updating genre", error: error.message });
    }
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const result = await genreService.deleteExistingGenre(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Genre not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error deleting genre", error: error.message });
    }
  }
};

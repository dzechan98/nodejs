import { Request, Response } from "express";
import * as bookService from "../services/bookService";
import { IBookQuery } from "../services/bookService";

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await bookService.createNewBook(req.body);
    res.status(201).json(newBook);
  } catch (error: any) {
    if (error.message === "Genre not found") {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error creating book", error: error.message });
    }
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const queryParams: IBookQuery = req.query;
    const result = await bookService.getAllBooks(queryParams);
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookDetails(req.params.id);
    res.status(200).json(book);
  } catch (error: any) {
    if (error.message === "Book not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error fetching book", error: error.message });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await bookService.updateExistingBook(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedBook);
  } catch (error: any) {
    if (
      error.message === "Book not found" ||
      error.message === "Genre not found"
    ) {
      res
        .status(error.message === "Book not found" ? 404 : 400)
        .json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error updating book", error: error.message });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const result = await bookService.deleteExistingBook(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Book not found") {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error deleting book", error: error.message });
    }
  }
};

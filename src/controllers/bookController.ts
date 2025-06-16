import { Request, Response } from "express";
import Book, { IBook } from "../models/Book";
import Genre from "../models/Genre";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { name, description, imageUrl, genre, author, publicationYear } =
      req.body;
    const genreExists = await Genre.findById(genre);
    if (!genreExists) {
      res.status(400).json({ message: "Genre not found" });
      return;
    }
    const newBook: IBook = new Book({
      name,
      description,
      imageUrl,
      genre,
      author,
      publicationYear,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("genre");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("genre");
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { name, description, imageUrl, genre, author, publicationYear } =
      req.body;
    if (genre) {
      const genreExists = await Genre.findById(genre);
      if (!genreExists) {
        res.status(400).json({ message: "Genre not found" });
        return;
      }
    }
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl, genre, author, publicationYear },
      { new: true, runValidators: true }
    ).populate("genre");
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

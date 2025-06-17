import Book, { IBook } from "../models/Book";
import Genre from "../models/Genre";

export interface IBookQuery {
  page?: number;
  limit?: number;
  genre?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getAllBooks = async (queryParams: IBookQuery) => {
  const {
    page = 1,
    limit = 10,
    genre,
    search,
    sortBy,
    sortOrder,
  } = queryParams;

  const query: any = {};
  if (genre) {
    query.genre = genre;
  }
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const sortOptions: any = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const books = await Book.find(query)
    .populate("genre")
    .sort(sortOptions)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const totalBooks = await Book.countDocuments(query);

  return {
    books,
    totalPages: Math.ceil(totalBooks / Number(limit)),
    currentPage: Number(page),
    totalBooks,
  };
};

export const getBookDetails = async (id: string) => {
  const book = await Book.findById(id).populate("genre");
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

export const createNewBook = async (bookData: Partial<IBook>) => {
  if (bookData.genre) {
    const genreExists = await Genre.findById(bookData.genre);
    if (!genreExists) {
      throw new Error("Genre not found");
    }
  }
  const newBook: IBook = new Book(bookData);
  await newBook.save();
  return newBook;
};

export const updateExistingBook = async (
  id: string,
  bookData: Partial<IBook>
) => {
  if (bookData.genre) {
    const genreExists = await Genre.findById(bookData.genre);
    if (!genreExists) {
      throw new Error("Genre not found");
    }
  }
  const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  }).populate("genre");

  if (!updatedBook) {
    throw new Error("Book not found");
  }
  return updatedBook;
};

export const deleteExistingBook = async (id: string) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new Error("Book not found");
  }
  return { message: "Book deleted successfully" };
};

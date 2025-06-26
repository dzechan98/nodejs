import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/database";
import User from "../models/User";
import Book from "../models/Book";
import Genre from "../models/Genre";
import Review from "../models/Review";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Book.deleteMany({});
    await Genre.deleteMany({});
    await Review.deleteMany({});

    console.log("Data cleared...");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const createdUsers = await User.insertMany([
      {
        username: "vinhdoan",
        email: "vinhdoan@example.com",
        passwordHash: hashedPassword,
        roles: ["user"],
      },
      {
        username: "admin",
        email: "admin@example.com",
        passwordHash: hashedPassword,
        roles: ["admin", "user"],
      },
    ]);

    const user1 = createdUsers[0]._id;
    const adminUser = createdUsers[1]._id;

    console.log("Users created...");

    const createdGenres = await Genre.insertMany([
      { name: "Fantasy" },
      { name: "Science Fiction" },
    ]);

    const fantasyGenre = createdGenres[0]._id;
    const sciFiGenre = createdGenres[1]._id;

    console.log("Genres created...");

    const createdBooks = await Book.insertMany([
      {
        name: "The Hobbit",
        description: "A fantasy novel by J.R.R. Tolkien.",
        imageUrl: "http://example.com/hobbit.jpg",
        genre: fantasyGenre,
        author: "J.R.R. Tolkien",
        publicationYear: 1937,
      },
      {
        name: "Dune",
        description: "A science fiction novel by Frank Herbert.",
        imageUrl: "http://example.com/dune.jpg",
        genre: sciFiGenre,
        author: "Frank Herbert",
        publicationYear: 1965,
      },
    ]);

    const book1 = createdBooks[0]._id;
    const book2 = createdBooks[1]._id;

    console.log("Books created...");

    await Review.insertMany([
      {
        book: book1,
        user: user1,
        rating: 5,
        comment: "An absolute classic! A must-read for any fantasy lover.",
      },
      {
        book: book1,
        user: adminUser,
        rating: 4,
        comment: "A great adventure, though a bit slow in the middle.",
      },
      {
        book: book2,
        user: user1,
        rating: 5,
        comment:
          "Mind-bending and epic in scale. One of the best sci-fi books ever.",
      },
    ]);

    console.log("Reviews created...");
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Book.deleteMany();
    await Genre.deleteMany();
    await Review.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

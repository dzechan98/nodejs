import Genre, { IGenre } from "../models/Genre";

export interface IGenreQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getAllGenres = async (queryParams: IGenreQuery) => {
  const { page = 1, limit = 10, search, sortBy, sortOrder } = queryParams;

  const query: any = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const sortOptions: any = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortOptions.name = 1;
  }

  const genres = await Genre.find(query)
    .sort(sortOptions)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const totalGenres = await Genre.countDocuments(query);

  return {
    genres,
    totalPages: Math.ceil(totalGenres / Number(limit)),
    currentPage: Number(page),
    totalGenres,
  };
};

export const getGenreDetails = async (id: string) => {
  const genre = await Genre.findById(id);
  if (!genre) {
    throw new Error("Genre not found");
  }
  return genre;
};

export const createNewGenre = async (genreData: Partial<IGenre>) => {
  const newGenre: IGenre = new Genre(genreData);
  await newGenre.save();
  return newGenre;
};

export const updateExistingGenre = async (
  id: string,
  genreData: Partial<IGenre>
) => {
  const updatedGenre = await Genre.findByIdAndUpdate(id, genreData, {
    new: true,
    runValidators: true,
  });

  if (!updatedGenre) {
    throw new Error("Genre not found");
  }
  return updatedGenre;
};

export const deleteExistingGenre = async (id: string) => {
  const deletedGenre = await Genre.findByIdAndDelete(id);
  if (!deletedGenre) {
    throw new Error("Genre not found");
  }
  return { message: "Genre deleted successfully" };
};

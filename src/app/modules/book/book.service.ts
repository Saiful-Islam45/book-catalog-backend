import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook, IFilters, IFiltersMenu } from './book.interface';
import { Book } from './book.model';

const addNewBook = async (book: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(book);
  if (!newBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add new book');
  }
  return newBook;
};
const getBooks = async (filters: IFilters): Promise<IBook[] | null> => {
  const { title, genre, author, publicationYear, limit }: IFilters = filters;
  const query:IFiltersMenu = {};
  if (title) {
    query['title'] = { $regex: title, $options: 'i' };
  }
  if (genre) {
    query['genre'] = { $regex: genre, $options: 'i' };
  }
  if (author) {
    query['author'] = { $regex: author, $options: 'i' };
  }
  if (publicationYear) {
    query['publicationYear'] = publicationYear;
  }

  let bookList;
  if (limit === 'all') {
    bookList = await Book.find(query).sort({ createdAt: -1 });
  } else {
    bookList = await Book.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string, 10));
  }

  if (!bookList) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch book list');
  }
  return bookList;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to fetch book by id: ' + id
    );
  }
  return book;
};

const deleteBook = async (id: string): Promise<null> => {
  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  await book.remove();
  return null;
};

const updateBook = async (
  id: string,
  data: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Book.findOneAndUpdate({ _id: id }, data, {
    new: true,
    returnOriginal: false,
  });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return book;
};

export const bookService = {
  addNewBook,
  getBooks,
  getSingleBook,
  deleteBook,
  updateBook
};

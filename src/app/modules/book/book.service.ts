import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook } from './book.interface';
import { Book } from './book.model';

const addNewBook = async (book: IBook): Promise<IBook | null> => {
  const newBook = (await Book.create(book)).populate('authorInfo');
  if (!newBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add new book');
  }
  return newBook;
};
const getBooks = async (): Promise<IBook[] | null> => {
  const bookList = await Book.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('authorInfo');
  if (!bookList) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch book list');
  }
  return bookList;
};
const getSingleBook = async (id): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id }).populate('authorInfo');
  if (!book) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to fetch book by id: ' + id
    );
  }
  return book;
};

const deleteBook = async (id): Promise<null> => {
  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  await book.remove();
  return null;
};

const updateBook= async (id: string, data: Partial<IBook>): Promise<IBook | null> => {
  const book = await Book.findOneAndUpdate({ _id: id }, data, { new: true }).populate('authorInfo');
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

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
  const bookList = await Book.find().sort({ createdAt: -1 }).limit(10).populate('authorInfo');
  if (!bookList) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch book list');
  }
  return bookList;
};


export const bookService = {
  addNewBook,
  getBooks
};

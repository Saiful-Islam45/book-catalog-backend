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


export const bookService = {
  addNewBook
};

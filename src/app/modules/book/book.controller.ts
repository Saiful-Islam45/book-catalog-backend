import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import tryCatch from '../../../shared/tryCatch';
import genericResponse from '../../../shared/genericResponse';
import { bookService } from './book.service';

const addNewBook: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const bookData = req.body;
    const result = await bookService.addNewBook(bookData);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'book added successfully!',
      data: result,
    });
  }
);

const getBooks: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const result = await bookService.getBooks(req.query);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'book list successfully fetched!',
      data: result,
    });
  }
);

const getSingleBook: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const result = await bookService.getSingleBook(req.params.id);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'book successfully fetched!',
      data: result,
    });
  }
);

const deleteBook: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const result = await bookService.deleteBook(req.params.id);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'book successfully deleted',
      data: result,
    });
  }
);

const updateBook: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const data=req.body
    const result = await bookService.updateBook(id, data);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'book successfully updated',
      data: result,
    });
  }
);

export const bookController = {
  addNewBook,
  getBooks,
  getSingleBook,
  deleteBook,
  updateBook
};

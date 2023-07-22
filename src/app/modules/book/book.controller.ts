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

export const bookController = {
  addNewBook
};

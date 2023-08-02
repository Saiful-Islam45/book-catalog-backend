import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import tryCatch from '../../../shared/tryCatch';
import genericResponse from '../../../shared/genericResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createUser(userData);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createUser
};

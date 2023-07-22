import httpStatus from 'http-status';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generateUserId } from './user.utils';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {

  const id = await generateUserId();
  user.id = id;

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
  }
  return newUser;
};


export const UserService = {
  createUser
};

import { Model } from 'mongoose';

export interface IUser {
  _id?: string;
  id: string;
  password: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'email' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

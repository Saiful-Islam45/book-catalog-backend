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
export type UserModel = {} & Model<IUser>;

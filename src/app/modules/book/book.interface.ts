import { Model } from 'mongoose';

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  reviews?: string[];
  authorInfo: string;
  publicationYear?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IFilters {
  title?: string;
  genre?: string;
  author?:string;
  publicationYear?: string;
  limit?: string;
}
export type BookModel = {} & Model<IBook>;

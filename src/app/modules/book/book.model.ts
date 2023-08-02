import mongoose, { Schema, model } from 'mongoose';
import { IBook, BookModel } from './book.interface';

const bookSchema = new mongoose.Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre:  { type: String, required: true },
    publicationYear: {type:Number, required: true},
    reviews:  { type: [String], required: false },
    authorInfo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);

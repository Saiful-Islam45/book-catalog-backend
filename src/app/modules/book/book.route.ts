import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();

router.post(
  '/add-new-book',
  bookController.addNewBook
);
export default router

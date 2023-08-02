import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();

router.route('/:id')
      .get( bookController.getSingleBook )
      .patch( bookController.updateBook )
      .delete( bookController.deleteBook )

router.post(
  '/add-new-book',
  bookController.addNewBook
);
router.get(
  '/',
  bookController.getBooks
);
export default router

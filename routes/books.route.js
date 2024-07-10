const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
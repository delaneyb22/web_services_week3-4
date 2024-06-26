const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/bookController');
const validation = require('../utils/validation');

router.get('/', bookController.getAllBooks);
router.post('/', validation.validateBook, bookController.createBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', validation.validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
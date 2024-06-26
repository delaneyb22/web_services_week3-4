const express = require('express');
const router = express.Router();
const authorController = require('../app/controllers/authorController');
const validation = require('../utils/validation');

router.get('/', authorController.getAllAuthors);
router.post('/', validation.validateAuthor, authorController.createAuthor);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', validation.validateAuthor, authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
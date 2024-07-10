const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const Book = require('../models/book.model');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving book' });
  }
});

router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating book' });
  }
}
);
router.put('/:id', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating book' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndRemove(req.params.id).exec();
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting book' });
    }
  });
  
  module.exports = router;
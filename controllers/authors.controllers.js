const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const Author = require('../models/author.model');

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().exec();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving authors' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).exec();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving author' });
  }
});

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('bio').notEmpty().withMessage('Bio is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const author = new Author(req.body);
    await author.save();
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating author' });
  }
});

router.put('/:id', [
  body('name').notEmpty().withMessage('Name is required'),
  body('bio').notEmpty().withMessage('Bio is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating author' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndRemove(req.params.id).exec();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting author' });
  }
});

module.exports = router;
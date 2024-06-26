const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id).exec();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};
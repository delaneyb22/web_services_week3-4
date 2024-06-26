const mongodb = require('mongodb');

const bookSchema = new mongodb.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  pages: { type: Number, required: true },
  rating: { type: Number, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongodb.model('Book', bookSchema);
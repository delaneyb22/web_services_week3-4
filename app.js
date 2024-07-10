const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authorsRoute = require('./routes/authors.route');
const booksRoute = require('./routes/books.route');

mongoose.connect('mongodb://localhost/bookshelf', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/authors', authorsRoute);
app.use('/books', booksRoute);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
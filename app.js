const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
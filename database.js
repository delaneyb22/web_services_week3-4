const mongodb = require('mongodb');

const dbUrl = 'mongodb://localhost:27017'; //??

mongodb.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongodb.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
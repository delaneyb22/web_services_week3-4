const mongodb = require('mongodb');

const authorSchema = new mongodb.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  birthDate: { type: Date, required: true },
  deathDate: { type: Date },
});

module.exports = mongodb.model('Author', authorSchema);
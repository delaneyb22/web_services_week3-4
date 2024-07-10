module.exports = {
    database: process.env.MONGODB_URL || 'mongodb+srv://delaneybaker:Ranger@cluster0.hvhskhu.mongodb.net/',
  };
//mongodb 

module.exports = {
  mongoose: {
    url: 'ongodb://localhost/bookshelf',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
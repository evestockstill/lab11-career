/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  tagline: {
    type: String,
    required: false
  },
  overview: {
    type: String,
    required: false
  } 
});





module.exports = mongoose.model('Movie', schema);

/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const csv = require('csvtojson');



const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: false
  },
  rating: {
    type: Number,
    required: false
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

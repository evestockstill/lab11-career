/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const csv = require('csvtojson');



const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date
  },
  rating: {
    type: Number
  },
  genres: {
    type: [String]
  },
  tagline: {
    type: String
  },
  overview: {
    type: String
  }
});

schema.statics.topRatedComediesSince2000 = function() {
  return this.aggregate([
    [
      {
        '$match': {
          'releaseDate': {
            '$gte': new Date('Sat, 01 Jan 2000 00:00:00 GMT')
          },
          'genres': 'Comedy',
          'rating': {
            '$gt': 8
          }
        }
      }, {
        '$sort': {
          'rating': -1
        }
      }, {
        '$sort': {
          'releaseDate': 1
        }
      }
    ]
  ]);
};
schema.statics.topRatedDramaSince2000 = function() {
  return this.aggregate([
    [
      {
        '$match': {
          'releaseDate': {
            '$gte': new Date('Sat, 01 Jan 2000 00:00:00 GMT')
          },
          'genres': 'Drama',
          'rating': {
            '$gt': 8
          }
        }
      }, {
        '$sort': {
          'rating': -1
        }
      }, {
        '$sort': {
          'releaseDate': 1
        }
      }
    ]
  ]);
};
schema.statics.titlesAndTaglines = function() {
  return this.aggregate([
    [
      {
        '$match': {
          'rating': {
            '$gte': 9
          }
        }
      }, {
        '$project': {
          'title': true,
          'tagline': true,
          'genres': true,
          'releaseDate': true
        }
      }, {
        '$match': {
          'releaseDate': {
            '$gte': new Date('Fri, 01 May 1970 00:00:00 GMT')
          }
        }
      }, {
        '$sort': {
          'releaseDate': -1
        }
      }
    ]
  ]);
};


module.exports = mongoose.model('Movie', schema);

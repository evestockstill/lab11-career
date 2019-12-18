const csv = require('csvtojson');
const Movie = require('../models/Movie');

const parseGenres = rawGenres => {
  return JSON.parse(rawGenres.replace(/'/g, '"'))
    .map(({ name }) => name);
};

function seedData() {
  return csv()
    .fromFile(__dirname + '/../../csv/movies_metadata.csv')
    .then(movies => {
      return movies.map(movie => ({
        genres: parseGenres(movie.genres),
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        tagline: movie.tagline,
        rating: movie.rating
      }));
    })
    .then(movies => Movie.create(movies));
}

module.exports = {
  parseGenres,
  seedData
};

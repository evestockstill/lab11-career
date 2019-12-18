const { Router } = require('express');
const Movie = require('../models/Movie');
module.exports = Router()

  .get('/', async(req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Movie
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(movies => res.send(movies))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Movie
      .create(req.body)
      .then(movie => res.send(movie))
      .catch(next);
  })
  .get('/:id', (req, res) => {
    Movie
      .findById(req.params.id)
      .then(movie => {
        res.send(movie);
      });
  })
  .patch('/:id', (req, res) => {
    Movie
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(movie => res.send(movie));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Movie.findByIdAndDelete(req.params.id),
    ])
      .then(([movie]) => res.send(movie));
  });

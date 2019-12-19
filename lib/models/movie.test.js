/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Movie = require('./Movie');

describe('Movie model', () => {
  
  it('has a required title', () => {
    const movie = new Movie();
    const { errors } = movie.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });
});


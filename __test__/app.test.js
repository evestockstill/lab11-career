require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Movie = require('../lib/models/Movie');

describe('movies routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let releaseDate;
  let movie;
  beforeEach(async() => {
    releaseDate = new Date();
    movie = await Movie.create({
      title: 'Here it comes',
      releaseDate,
      rating: 8,
      genres: ['Horror'],
      tagline: 'You cant watch out, but here it comes',
      overview: 'you cant escape, you cant hide, you just have to except it comes'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new movie', () => {
    const releaseDate = new Date();
    return request(app)
      .post('/api/v1/movies')
      .send({
        title: 'Here it comes',
        releaseDate,
        rating: 8,
        genres: ['Horror'],
        tagline: 'You cant watch out, but here it comes',
        overview: 'you cant escape, you cant hide, you just have to except it comes'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Here it comes',
          releaseDate: releaseDate.toISOString(),
          rating: 8,
          genres: ['Horror'],
          tagline: 'You cant watch out, but here it comes',
          overview: 'you cant escape, you cant hide, you just have to except it comes',
          __v: 0
        });
      });
  });
  it('gets all movies', () => {
    return request(app)
      .get('/api/v1/movies')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: movie.id,
            title: 'Here it comes',
            releaseDate: releaseDate.toISOString(),
            rating: 8,
            genres: ['Horror'],
            tagline: 'You cant watch out, but here it comes',
            overview: 'you cant escape, you cant hide, you just have to except it comes',
            __v: 0
          }
        ]);
      });
  });
  it('gets a movie by id', () => {
    return request(app)
      .get(`/api/v1/movies/${movie.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: movie.id,
          title: 'Here it comes',
          releaseDate: releaseDate.toISOString(),
          rating: 8,
          genres: ['Horror'],
          tagline: 'You cant watch out, but here it comes',
          overview: 'you cant escape, you cant hide, you just have to except it comes',
          __v: 0
        });
      });
  });
  it('updates a movie', () => {
    return request(app)
      .patch(`/api/v1/movies/${movie.id}`)
      .send({ title: 'Here it comes' })
      .then(res => {
        expect(res.body).toEqual({
          _id: movie.id,
          title: 'Here it comes',
          releaseDate: releaseDate.toISOString(),
          rating: 8,
          genres: ['Horror'],
          tagline: 'You cant watch out, but here it comes',
          overview: 'you cant escape, you cant hide, you just have to except it comes',
          __v: 0
        });
      });
  });
  it('deletes a movie', () => {
    return request(app)
      .delete(`/api/v1/movies/${movie.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: movie.id,
          title: 'Here it comes',
          releaseDate: releaseDate.toISOString(),
          rating: 8,
          genres: ['Horror'],
          tagline: 'You cant watch out, but here it comes',
          overview: 'you cant escape, you cant hide, you just have to except it comes',
          __v: 0
        });
      });
  });
});
  





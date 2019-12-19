const { parseGenres } = require('./seed-data');

describe('parse genres', () => {
  it('parses genres from csv', () => {
    const rawGenres = '[{\'id\': 12, \'name\': \'Thriller\'}, {\'id\': 10, \'name\': \'Romance\'}]';
    const genres = parseGenres(rawGenres);

    expect(genres).toEqual(['Thriller', 'Romance']);
  });
});

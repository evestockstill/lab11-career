const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/movies', require('../lib/routes/movies'));


app.use(require('../lib/middleware/not-found'));
app.use(require('../lib/middleware/error'));

module.exports = app;

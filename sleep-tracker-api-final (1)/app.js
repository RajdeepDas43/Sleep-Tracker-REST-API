const express = require('express');
const morgan = require('morgan');
const sleepRoutes = require('./routes/sleepRoutes');
const apiErrorHandler = require('./utils/apiErrorHandler');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/sleep', sleepRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(apiErrorHandler);

module.exports = app;

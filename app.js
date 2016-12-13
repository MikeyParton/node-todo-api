const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up express
const app = express();

// Log requests to console
app.use(logger('dev'));

//Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup default catch-all route that sends back a welcome message
require('./server/routes')(app)
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
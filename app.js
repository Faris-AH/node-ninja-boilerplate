const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const user = require('./app/user/user.route');
const path = require('path');

/**
 * Create Express server.
 */
const app = express();

/**
 * Load environment variables from .env file
 */
dotenv.config({path: __dirname + '/.env.example'});


/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log(error.message)
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/api/user', user);




/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);


/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
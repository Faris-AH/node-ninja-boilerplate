const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const cors = require('cors')
const db = require('./db');
const indexRoutes = require('./app/index.route');
/**
 * Create Express server.
 */
const app = express();

app.use(cors());

/**
 * Load environment variables from .env file
 */
dotenv.config({path: __dirname + '/.env.example'});

/**
 * Db initialization
 */
db.init();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

indexRoutes(app);

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
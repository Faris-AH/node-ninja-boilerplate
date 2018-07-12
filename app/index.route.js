const user = require('./user/user.route');

module.exports = (app) => {
  app.use('/v1/api/user', user);
}

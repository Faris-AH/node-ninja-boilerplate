const userRoutes = require('./user/user.route');

module.exports = (app) => {
  app.use('/v1/api/user', userRoutes);
}

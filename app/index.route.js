const userRoutes = require('./user/user.route');
const chatRoutes = require('./chat/chat.route');
module.exports = (app) => {
  app.use('/v1/api/user', userRoutes);
  app.use('/v1/api/chat',chatRoutes);
}

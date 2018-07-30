const jwt = require('jsonwebtoken');
const Response = require('../common/response');
const User = new (require('../user/user.model')).userModel();
const isUserExitsMiddleware = async (req, res, next) => {
  try {
    const user = await User.model.findOne({ _id: req.userId });
    if (user) {
      next();
    }
    else {
      return Response.Send(res, Response.BadRequest("Recipient not found"));
    }
  }
  catch (e) {
    return Response.Send(res, Response.BadRequest("Recipient not found"));
  }
};

module.exports = isUserExitsMiddleware;
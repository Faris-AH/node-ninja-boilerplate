const jwt = require('jsonwebtoken');
const Response = require('../common/response');

function verifyToken(req, res, next) {
  var token = req.headers['authorization'];
  if (!token)
    return Response.Send(res, Response.BadRequest("No token provided."));
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  }
  catch (e) {
   return Response.Send(res, Response.Unauthorized("Unauthorized"));
  }
};

module.exports = verifyToken;
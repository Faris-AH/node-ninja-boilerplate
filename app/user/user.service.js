const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = new (require('./user.model')).userModel();
const Response = require('../common/response');


function UserService() {

}
UserService.prototype.signupPost = async function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const userData = {
    email: req.body.email,
    password: hashedPassword
  };
  try {
    let newUser = await User.model.create(userData);
    // create a token
    newUser['token'] = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return Response.Success(newUser, 'Account registered successfully');

  }
  catch (e) {
    if (e && e.code === 11000) {
      return Response.BadRequest("Email is already resgistered.");
    }
    else {
      return Response.Error();
    }
  }
}
UserService.prototype.me = async function (req, res) {
  const token = req.headers['authorization'];
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await User.model.findById(decoded.id);
    if (!user) {
      return Response.Unauthorized("Unauthorized");

    }
    return Response.Success(user, "Success");
  }
  catch (e) {
    return Response.Unauthorized("Unauthorized");
  }

}
UserService.prototype.login = async function (req, res) {
  try {
    const user = await User.model.findOne({ email: req.body.email });
    if (!user) {
      return Response.BadRequest("Email or password is incorrect.");
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return Response.BadRequest("Email or password is incorrect.");
    }
    user['token'] = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return Response.Success(user, "Success");
  }
  catch (e) {
    return Response.Error();
  }

}

module.exports = UserService;
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
    return Response.Success(newUser, 'Account registered successfully');

  }
  catch (e) {
   return Response.Error();
  }
}

module.exports = UserService;
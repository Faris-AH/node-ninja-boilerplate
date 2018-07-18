const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = new (require('./user.model')).userModel();
const Response = require('../common/response');


function UserService() {

}
UserService.prototype.fetchSignupUsers = async function (req,res){
  try{
    const users = await User.model.find({});
    if(!users){
      return Response.Success([],'Success');
    }
    return Response.Success(users,'Success');
  }
  catch(e){
    return Response.Error();
  }
}
UserService.prototype.signupPost = async function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const userData = {
    email: req.body.email,
    password: hashedPassword
  };
  try {
    const user = await User.model.findOne({ email: userData.email });
    if (user) {
      return Response.BadRequest("Email is already resgistered.");
    }
    let newUser = await User.model.create(userData);
    // create a token
    newUser['token'] = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return Response.Success(newUser, 'Account registered successfully');

  }
  catch (e) {
    return Response.Error();
  }
}
UserService.prototype.me = async function (req, res) {
  try {
    const user = await User.model.findById(req.userId);
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
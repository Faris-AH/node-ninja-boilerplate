
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = new (require('./user.service'))();

function UserController() {

}
UserController.prototype.signupPost = async function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  };
  try{
    let response = await UserService.signupPost(userData);
    res.json(response);
  }
  catch(e){
    console.log(e);
  }
}
module.exports = UserController;
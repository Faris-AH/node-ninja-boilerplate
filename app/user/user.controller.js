const UserService = new (require('./user.service'))();
const Response = require('../common/response');

function UserController() {

}
UserController.prototype.signupPost = async function (req, res) {
  try {
    let response = await UserService.signupPost(req, res);
    res.json(response);
  }
  catch (e) {
    res.json(Response.Error());
  }
}
UserController.prototype.me = async function (req, res) {
  try {
    let response = await UserService.me(req, res);
    res.json(response);
  }
  catch (e) {
    res.json(Response.Error());
  }
}
UserController.prototype.login = async function (req, res) {
  try {
    let response = await UserService.login(req, res);
    res.json(response);
  }
  catch (e) {
    res.json(Response.Error());
  }
}
module.exports = UserController;
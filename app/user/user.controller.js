const UserService = new (require('./user.service'))();
const Response = require('../common/response');

function UserController() {

}
UserController.prototype.signupPost = async function (req, res) {
  try {
    let response = await UserService.signupPost(req, res);
    Response.Send(res, res.json(response));

  }
  catch (e) {
    Response.Send(res, Response.Error());

  }
}
UserController.prototype.me = async function (req, res) {
  try {
    let response = await UserService.me(req, res);
    Response.Send(res, res.json(response));
  }
  catch (e) {
    Response.Send(res, Response.Error());
  }
}
UserController.prototype.login = async function (req, res) {
  try {
    let response = await UserService.login(req, res);
    Response.Send(res, response);
  }
  catch (e) {
    Response.Send(res, Response.Error());
  }
}
module.exports = UserController;
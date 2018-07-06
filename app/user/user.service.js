const Response = require('../common/response');

const User = new (require('./user.model')).userModel();


function UserService(){

}
UserService.prototype.signupPost = async function(data){
  try{
    let newUser = await User.model.create(data);
    return Response.Success(newUser, 'Account registered successfully');

  }
  catch(e){
    console.log(e);
  }
}

module.exports = UserService;
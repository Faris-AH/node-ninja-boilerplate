const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

const user = mongoose.model('User', userSchema);

function User(){
  this.model = user;
}
module.exports.userModel = User;
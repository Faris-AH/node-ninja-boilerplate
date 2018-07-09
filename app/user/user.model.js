const mongoose = require('mongoose');

const userSchemaOptions =  {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  token: String
},userSchemaOptions);

const user = mongoose.model('User', userSchema);
userSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
}
function User() {
  this.model = user;
}
module.exports.userModel = User;
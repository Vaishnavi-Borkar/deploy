const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  gender: { type: String, require: true },
  pass: { type: String, require: true },
  age: { type: Number, require: true },
  city: { type: String, require: true },
});

const userModel = mongoose.model("logindata", userSchema);

module.exports = {
  userModel,
};

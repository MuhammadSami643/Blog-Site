const mongoose = require("mongoose");

const UserSchema = require("../Schema/Users");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;

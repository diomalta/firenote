const mongoose = require("mongoose");
const CategorySchema = require('./Category');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  categories: [CategorySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.methods.generateToken = function generateToken() {
  return jwt.sign({ _id: this._id }, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = mongoose.model("User", UserSchema);

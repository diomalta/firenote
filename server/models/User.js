const mongoose = require("mongoose");
const CategorySchema = require('./Category');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  categories: [CategorySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);

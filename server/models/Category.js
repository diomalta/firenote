const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: String,
  content: String,
  color: String,
  subCategories: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Category", CategorySchema);
module.exports = CategorySchema;

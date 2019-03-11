const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new mongoose.Schema({
  title: String,
  content: String,
  sigla: String,
  color: String,
  categoryId: { type: ObjectId, ref: 'Category' },
  anotations: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
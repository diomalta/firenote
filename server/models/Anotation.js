const mongoose = require("mongoose");

const AnotationSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Anotation", AnotationSchema);
module.exports = AnotationSchema;

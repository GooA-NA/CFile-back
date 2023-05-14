const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: String,
  type: String,
  path: { type: String, default: "" },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "File" },
  childs: { type: mongoose.SchemaTypes.ObjectId, ref: "File" },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;

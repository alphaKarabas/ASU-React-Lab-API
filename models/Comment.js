const { Schema, ObjectId } = require("mongoose");
const connect = require("../databaseInitializer");

const Comment = new Schema({
  userId: { type: ObjectId, required: true },
  text: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

module.exports = connect.model("Comment", Comment);

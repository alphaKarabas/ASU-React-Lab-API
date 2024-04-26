const { Schema } = require("mongoose");
const connect = require("../databaseInitializer")

const User = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = connect.model("User", User);
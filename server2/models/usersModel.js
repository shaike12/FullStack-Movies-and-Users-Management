let mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("users", usersSchema);

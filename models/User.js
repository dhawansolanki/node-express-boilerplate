const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String, // Should be hashed in a real application
});

module.exports = mongoose.model("User", userSchema);

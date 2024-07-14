const User = require("../models/User");

async function findUserByUsername(username) {
  return await User.findOne({ username });
}

module.exports = {
  findUserByUsername,
};

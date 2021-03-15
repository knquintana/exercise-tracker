let User = require('../models/user.model');

let getUserByUsername = async (username) => {
  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    throw new Error(`User not found.`);
  } else {
    return user;
  }
};

module.exports = {
  getUserByUsername: getUserByUsername
}
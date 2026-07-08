const bcrypt = require("bcrypt");

function hashToken(token) {
  return bcrypt.hash(token, 10)
}

module.exports = hashToken;
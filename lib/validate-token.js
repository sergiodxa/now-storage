const Err = require("./error.js");

function validateToken(token) {
  // must have token
  if (!token) {
    throw new Err("Missing Now token", "missing-token");
  }
  // must be a string
  if (typeof token !== "string") {
    throw new Err("Invalid token", "invalid-token");
  }
  return true;
}

module.exports = validateToken;

const crypto = require("crypto");

function getSHA(file) {
  const shasum = crypto.createHash("sha1");
  shasum.update(file);
  return shasum.digest("hex");
}

module.exports = getSHA;

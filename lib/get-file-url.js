const { FILE_URL } = require("./constants.js");

function getFileURL(config = {}) {
  return config.teamId || config.team
    ? `${FILE_URL}?teamId=${config.teamId || config.team}`
    : FILE_URL;
}

module.exports = getFileURL;

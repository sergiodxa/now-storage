const Err = require("./error.js");

function validateFiles(files) {
  // must have files
  if (!files) {
    throw new Err(
      "You must provide a file object or an array of file objects",
      "missing-file-object"
    );
  }

  // default to array
  if (!Array.isArray(files)) {
    files = [files];
  }

  // must have elements
  if (files.length === 0) {
    throw new Err(
      "You must provide a file object or an array of file objects",
      "missing-file-object"
    );
  }

  return true;
}

module.exports = validateFiles;

const Err = require("./error.js");

function validateFile(file) {
  // must have a file
  if (!file) {
    throw new Err("The file is required", "missin-file-object");
  }
  // must be an object
  if (typeof file !== "object") {
    throw new Err("The file provided must be an object", "invalid-file-shape");
  }
  // must have a name
  if (!file.name) {
    throw new Err("The file object must have a name", "invalid-file-shape");
  }
  // must be a string
  if (typeof file.name !== "string") {
    throw new Err("The file name must be a string", "invalid-file-name-type");
  }
  // must have a content
  if (!file.content) {
    throw new Err("The file object must have a content", "invalid-file-shape");
  }
  return true;
}

module.exports = validateFile;

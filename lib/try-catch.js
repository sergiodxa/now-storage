const Err = require('./error');

function tryCatch(fn) {
  return async (...params) => {
    try {
      return await fn.apply(this, params);
    } catch (error) {
      if (!(error instanceof Err)) {
        const err = new Err(`File upload failed`, 'file-upload-failed');
        err.original = error;
        throw err;
      }
      if (process.env.NODE_ENV !== 'production') {
        error.message = `${error.message} More details: ${error.details}`;
        delete error.details;
      }
      throw error;
    }
  }
}

module.exports = tryCatch

// Packages
const retry = require("async-retry");

// Modules
const createDeployment = require("./lib/create-deployment.js");
const getSHA = require("./lib/get-sha");
const tryCatch = require("./lib/try-catch.js");
const uploadFile = require("./lib/upload-file.js");
const validateFile = require("./lib/validate-file.js");
const validateFiles = require("./lib/validate-files.js");
const validateToken = require("./lib/validate-token.js");
const { DEPLOYMENT_NAME, RETRIES } = require("./lib/constants.js");

const defaultConfig = {
  deploymentName: DEPLOYMENT_NAME,
  retry: {
    retries: RETRIES
  }
};

exports.upload = tryCatch(async function upload(
  token,
  file,
  config = defaultConfig
) {
  validateToken(token);
  validateFile(file);
  file.sha = getSHA(file.content);
  await retry(uploadFile(token, config, file), {
    ...defaultConfig.retry,
    ...config.retry
  });
  return retry(createDeployment(token, config, [file]), {
    ...defaultConfig.retry,
    ...config.retry
  });
});

exports.multiUpload = tryCatch(async function multiUpload(
  token,
  files,
  config = defaultConfig
) {
  validateFiles(files);
  validateToken(token);
  files = files.map(file => ({ ...file, sha: getSHA(file.content) }));

  await Promise.all(
    files.map(file => {
      validateFile(file);

      return retry(uploadFile(token, config, file), {
        ...defaultConfig.retry,
        ...config.retry
      });
    })
  );

  return await retry(createDeployment(token, config, files), {
    ...defaultConfig.retry,
    ...config.retry
  });
});

const fetch = require('node-fetch');
const retry = require('async-retry');

const Err = require('./lib/error');
const tryCatch = require('./lib/try-catch.js');
const getSHA = require('./lib/get-sha');

const FILE_URL = 'https://api.zeit.co/v2/now/files';
const DEPLOY_URL = 'https://api.zeit.co/v2/now/deployments';

const defaultConfig = {
  deploymentName: 'now-storage',
  retry: {
    retries: 3
  }
};

function validateToken (token) {
  if (!token) {
    throw new Err('Missing Now token.', 'missing-token');
  }
  if (typeof token !== 'string') {
    throw new Err('Invalid token', 'invalid-token');
  }
}

function validateFiles (files) {
  if (!files) {
    throw new Err('You must provide a file object or an array of file objects.', 'missing-file-object');
  }

  if (!Array.isArray(files)) {
    files = [files];
  }

  if (files.length === 0) {
    throw new Err('You must provide a file object or an array of file objects.', 'missing-file-object');
  }
}

function getFileUrl (config) {
  return config.teamId || config.team
      ? `${FILE_URL}?teamId=${config.teamId || config.team}`
      : FILE_URL;
}

function getDeployUrl (config) {
  return config.teamId || config.team
      ? `${DEPLOY_URL}?teamId=${config.teamId || config.team}`
      : DEPLOY_URL;
}

function validateFile (file) {
  if (typeof file !== 'object') {
    throw new Err('The file provided must be an object.', 'invalid-file-shape');
  }
  // validate file.name
  if (!file.name) {
    throw new Err('The file object must have a name.', 'invalid-file-shape');
  }
  if (typeof file.name !== 'string') {
    throw new Err('The file name must be a string.', 'invalid-file-name-type');
  }
  // validate file.content
  if (!file.content) {
    throw new Err('The file object must have a content.', 'invalid-file-shape');
  }
}

function getDeployName (config) {
  return config.deploymentName || defaultConfig.deploymentName;
}

function createDeployment (token, config, files) {

  const deployUrl = getDeployUrl(config);
  const name = getDeployName(config);

  return async () => {
    const response = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        deploymentType: 'STATIC',
        files: files.map(file => ({
          file: file.name,
          sha: file.sha,
          size: file.content.length
        }))
      })
    });

    const body = await response.json();

    if (!response.ok) {
      (body.error.warnings || []).forEach(warning =>
        console.warn(`Warning: ${warning.reason}\n${warning.sha}`)
      );

      (body.error.missing || []).forEach(missing =>
        console.warn(`Warning: The file ${missing} is missing.`)
      );
      throw new Error(body.error.message);
    }

    return body;
  }
}

function uploadFile (token, config, file) {

  const fileUrl = getFileUrl(config);

  return async () => {
    const response = await fetch(fileUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': file.content.length,
        'x-now-digest': file.sha,
        'x-now-size': file.content.length
      },
      body: file.content
    });

    if (!response.ok) {
      const body = await response.json();

      switch (body.error.code) {
        case 'forbidden': {
          const error = new Err('Not authorized.', 'not-authorized');
          error.code = body.error.code;
          throw error;
        }
        default: {
          const error = new Err(
            `File upload failed, code: ${body.error.code}.`,
            'file-upload-failed'
          );
          error.code = body.error.code;
          throw error;
        }
      }
    }
  }
}

async function upload(token, file, config = defaultConfig) {

  validateToken(token);

  validateFile(file);

  file.sha = getSHA(file.content);

  await retry(
    uploadFile(token, config, file),
    { ...defaultConfig.retry, ...config.retry }
  );

  return retry(
    createDeployment(token, config, [file]),
    { ...defaultConfig.retry, ...config.retry }
  );
}

async function multiUpload (token, files, config = defaultConfig) {

  validateFiles(files);

  validateToken(token);

  files = files.map(file => ({...file, sha: getSHA(file.content)}));

  const uploadedFiles = files.map(file => {
    validateFile(file);

    return retry(
      uploadFile(token, config, file),
      {...defaultConfig.retry, ...config.retry}
    );
  });

  await Promise.all(uploadedFiles);

  return await retry(
    createDeployment(token, config, files),
    {...defaultConfig.retry, ...config.retry}
  );
}

exports.upload = tryCatch(upload);
exports.multiUpload = tryCatch(multiUpload);

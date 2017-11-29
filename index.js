const crypto = require('crypto');
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

async function upload(token, file, config = defaultConfig) {
  // validate token
  if (!token) {
    throw new Err('Missing Now token.', 'missing-token');
  }
  if (typeof token !== 'string') {
    throw new Err('Invalid token', 'invalid-token');
  }

  // validate file
  if (!file) {
    throw new Err('You must provide a file object.', 'missing-file-object');
  }
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

  const sha = getSHA(file.content);

  // check for teamId
  const fileUrl =
    config.teamId || config.team
      ? `${FILE_URL}?teamId=${config.teamId || config.team}`
      : FILE_URL;
  const deployUrl =
    config.teamId || config.team
      ? `${DEPLOY_URL}?teamId=${config.teamId || config.team}`
      : DEPLOY_URL;

  await retry(
    async () => {
      const response = await fetch(fileUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
          'Content-Length': file.content.length,
          'x-now-digest': sha,
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
    },
    { ...defaultConfig.retry, ...config.retry }
  );

  return await retry(
    async () => {
      const response = await fetch(deployUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: config.deploymentName || defaultConfig.deploymentName,
          deploymentType: 'STATIC',
          files: [{ file: file.name, sha, size: file.content.length }]
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
    },
    { ...defaultConfig.retry, ...config.retry }
  );
}

exports.upload = tryCatch(upload);

// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');

module.exports = (file, config) => upload(process.env.NOW_TOKEN, file, config);

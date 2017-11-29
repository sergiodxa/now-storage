// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

async function main() {
  // read the file as buffer
  const image = await readFile('./now-logo.png');
  // upload the buffer as content
  const { url } = await upload(process.env.NOW_TOKEN, {
    name: 'now-logo.png',
    content: image
  });
  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');

async function main() {
  // we need to convert the JS object to string
  const content = JSON.stringify(require('./package.json'))
  // upload the stringified JSON as a normal text file
  const { url } = await upload(process.env.NOW_TOKEN, {
    name: 'package.json',
    content
  });
  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

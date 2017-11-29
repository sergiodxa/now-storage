// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');

async function main() {
  const { url } = await upload(process.env.NOW_TOKEN, {
    name: 'my-file.txt',
    content: 'This is a file uploaded with now-storage.'
  });
  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

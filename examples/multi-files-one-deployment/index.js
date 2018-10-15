// load env from now.json
require('now-env').config();

const { multiUpload } = require('now-storage');

async function main() {
  const { url } = await multiUpload(
    process.env.NOW_TOKEN,
    [
      {
        name: 'my-file-1.txt',
        content: 'This is a file 1 uploaded with now-storage.'
      },
      {
        name: 'my-file-2.txt',
        content: 'This is a file 2 uploaded with now-storage.'
      }
    ],
    { deploymentName: 'now-storage-test' }
  );

  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

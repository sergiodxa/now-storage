// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');

async function main() {
  const { url } = await upload(
    process.env.NOW_TOKEN,
    {
      name: 'my-file.txt',
      content: 'This is a file uploaded with now-storage.'
    },
    { deploymentName: 'now-storage-test', teamId: process.env.NOW_TEAM }
  );
  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

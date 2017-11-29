// load env from now.json
require('now-env').config();

const { upload } = require('now-storage');

async function main() {
  const responses = await Promise.all([
    await upload(process.env.NOW_TOKEN, {
      name: 'my-file-1.txt',
      content: 'This is a file 1 uploaded with now-storage.'
    }),
    await upload(process.env.NOW_TOKEN, {
      name: 'my-file-2.txt',
      content: 'This is a file 2 uploaded with now-storage.'
    }),
  ]);
  return responses.map(({ url }) => url);
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

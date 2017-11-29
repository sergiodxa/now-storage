const upload = require('./upload');

async function main() {
  const { url } = await upload({
    name: 'my-file.txt',
    content: 'This is a file uploaded with now-storage.'
  });
  return url;
}

main()
  .then(url => console.log(url))
  .catch(error => console.error(error));

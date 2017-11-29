# Invalid file shape
The object passed with the file information has an invalid shape.

It must contains the keys `name` and `content`. Check if you're missing some of those.

Example:
```js
await upload(process.env.NOW_TOKEN, {
  name: 'my-file.txt',
  content: 'This is a file uploaded with now-storage.'
});
```

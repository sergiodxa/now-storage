# Missing file object
The object with the file information is missing.

Check you're passing an object with the keys `name` and `content` as the second argument of the `upload` function.

Example:
```js
await upload(process.env.NOW_TOKEN, {
  name: 'my-file.txt',
  content: 'This is a file uploaded with now-storage.'
});
```

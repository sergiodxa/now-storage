# Invalid file name type
The type of the key `name` must be a `String`.

You passed any other value as the `name` of the file to upload.

Example:
```js
await upload(process.env.NOW_TOKEN, {
  name: 'my-file.txt',
  content: 'This is a file uploaded with now-storage.'
});
```

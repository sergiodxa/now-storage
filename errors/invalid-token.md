# Invalid Now token
The token provided must be a `String` but it was something else.

Check you're providing the correct value as token to the `upload` function.

Example:
```js
await upload(process.env.NOW_TOKEN, {
  name: 'my-file.txt',
  content: 'This is a file uploaded with now-storage.'
});
```

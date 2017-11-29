# Missing Now token
In order to use `now-storage` you must provide the function with a token of your Now account.

You can get this token going to [https://zeit.co/account/tokens](https://zeit.co/account/tokens).

Once you have it the recommendation is to set it as a environment variable and then pass it to `upload`.

Example:
```js
await upload(process.env.NOW_TOKEN, {
  name: 'my-file.txt',
  content: 'This is a file uploaded with now-storage.'
});
```

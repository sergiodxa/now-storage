# now-storage
Use Now static deployments to upload and store files.

## Usage
Install it:

```bash
yarn add now-storage
# npm i now-storage
```

Then load it inside your app.

```js
const { upload } = require('now-storage');
```

And call the `upload` function with the Now token and the file to upload.

```js
const { url } = await upload(process.env.NOW_TOKEN, {
  name: 'file-name',
  content: await readFile('./path/to/a/file')
});
```

### Configuration
All the deployments are going to have the name `uploaded-file` and the `upload` function is going to retry maximum 3 times to upload the file and another 3 times to create the deployment.

That could be configured passing a third argument to the `upload method` with an object using the following format.

```js
const config = {
  deploymentName: 'uploaded-file',
  retry: {
    retries: 3
  }
};
```

That's the default configuration, the `retry` key could receive any configuration from `async-retry`.

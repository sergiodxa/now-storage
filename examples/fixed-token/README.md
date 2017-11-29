# Fixed token
This example show how you can create a wrapper around the `upload` function to avoid passing the NOW_TOKEN every time.

## How to run it
Create a `now-secrets.json` with the key `@now_token` containing a [Now token](https://zeit.co/account/tokens).

Install the dependencies with npm or yarn.

```bash
yarn
# or npm i
```

And now run the `index.js` with Node.js

```bash
yarn start
# or npm start or node .
```

You'll see a Now unique URL in your terminal.

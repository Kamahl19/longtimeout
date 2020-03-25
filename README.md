# LongTimeout

Long timeout makes it possible to have a timeout that is longer than 24.8 days (2^31-1 milliseconds).

## Installation

```
yarn add longtimeout
```

## Usage

```js
import { setLongTimeout, clearLongTimeout } from 'longtimeout';

const timeout = setLongTimeout(() => {
  console.log('in 30 days');
}, 1000 * 60 * 60 * 24 * 30);

clearLongTimeout(timeout);
```

## Local Development

### `yarn start`

Runs the project in development/watch mode. Your library will be rebuilt upon changes.

### `yarn build`

Bundles the package to the `dist` folder. The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

## License

This is open source software [licensed as MIT](https://github.com/Kamahl19/longtimeout/blob/master/LICENSE).

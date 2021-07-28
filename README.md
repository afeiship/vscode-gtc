# next-fetch-with-retry
> Fetch with try for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-fetch-with-retry
```

## usage
```js
import '@jswork/next-fetch-with-retry';

const betterFetch = nx.fetchWithRetry(fetch);

betterFetch('https://www.google1.com/')
  .catch((err) => {
    console.log('err::::', err);
  });
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch-with-retry/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-fetch-with-retry
[version-url]: https://npmjs.org/package/@jswork/next-fetch-with-retry

[license-image]: https://img.shields.io/npm/l/@jswork/next-fetch-with-retry
[license-url]: https://github.com/afeiship/next-fetch-with-retry/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-fetch-with-retry
[size-url]: https://github.com/afeiship/next-fetch-with-retry/blob/master/dist/next-fetch-with-retry.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-fetch-with-retry
[download-url]: https://www.npmjs.com/package/@jswork/next-fetch-with-retry

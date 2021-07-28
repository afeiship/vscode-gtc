require('../src');
require('@jswork/next-fetch-with-timeout');
const fetch = require('node-fetch');
const betterFetch = nx.fetchWithRetry(fetch);

betterFetch('https://www.google1.com/')
  .then((res) => {
    console.log('res');
  })
  .catch((err) => {
    console.log('err::::', err);
  });

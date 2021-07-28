(function () {
  require('../src');
  require('@jswork/next-fetch-with-timeout');
  const fetch = require('node-fetch');
  const betterFetch = nx.fetchWithRetry(fetch);

  jest.setTimeout(50 * 1000);

  describe('api.basic test', () => {
    test('nx.fetchWithRetry with 3 times', function (done) {
      betterFetch('https://www.google1.com/').catch((err) => {
        expect(err).toEqual({
          type: 'retry_max',
          message: 'Retry max from `next-fetch-with-retry`'
        });
        done();
      });
    });
  });
})();

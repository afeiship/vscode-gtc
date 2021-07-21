(function () {
  require('../src');
  require('@jswork/next-fetch-with-timeout');
  const fetch = require('node-fetch');
  const newFetch = nx.fetchWithRetry(nx.fetchWithTimeout(fetch));

  jest.setTimeout(50 * 1000);

  describe('api.basic test', () => {
    test('nx.fetchWithRetry', function (done) {
      newFetch('https://www.google.com', {
        timeout: 1e3,
        retryOn: function (attempt, error, response) {
          console.log('error:', error);
          // retry on any network error, or 4xx or 5xx status codes
          if (error !== null || response.status >= 400) {
            console.log(`retrying, attempt number ${attempt + 1}`);
            return true;
          }
          return false;
        }
      })
        .finally(() => {
          console.log('done');
          done();
        });
      // const obj1 = { name: 'fei' };
      // const obj2 = { email: '1290657123@qq.com' };
      // const result = {};
      // nx.fetchWithRetry(result, obj1, obj2);
      // expect(result.name, obj1.name).toBe(null);
    });
  });
})();

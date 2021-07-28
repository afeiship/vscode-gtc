(function () {
  require('../src');
  require('@jswork/next-fetch-with-timeout');
  const fetch = require('node-fetch');
  const betterFetch = nx.fetchWithRetry(fetch);

  jest.setTimeout(50 * 1000);

  describe('api.basic test', () => {
    test('nx.fetchWithRetry', function (done) {
      betterFetch('https://www.google1.com/')
        .then((res) => {
          console.log('res');
        })
        .catch((err) => {
          console.log('err::::', err);
        })
        .finally((e) => {
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

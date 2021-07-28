(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { retries: 3, retryDelay: 1000 };
  var RETRY_MESSAGE = { type: 'retry_max', message: 'Retry max from `next-fetch-with-retry`' };

  // https://stackoverflow.com/questions/46175660/fetch-retry-request-on-failure

  function wait(inDelay) {
    return new Promise((resolve) => setTimeout(resolve, inDelay));
  }

  nx.fetchWithRetry = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      var execute = function (left) {
        return new Promise(function (resolve, reject) {
          inFetch(inUrl, options)
            .then(resolve)
            .catch(() => {
              if (left-- === 0) return reject(RETRY_MESSAGE);
              return wait(options.retryDelay)
                .then(() => execute(left))
                .catch(reject);
            });
        });
      };

      return execute(options.retries);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithRetry;
  }
})();

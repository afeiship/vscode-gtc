(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { retries: 3, retryDelay: 1000 };

  // https://stackoverflow.com/questions/46175660/fetch-retry-request-on-failure

  function wait(inDelay) {
    return new Promise((resolve) => setTimeout(resolve, inDelay));
  }

  nx.fetchWithRetry = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      var retriesLeft = options.retries;
      var execute = function (left) {
        return new Promise(function (resolve, reject) {
          inFetch(inUrl, options)
            .catch((error) => {
              console.log('catch error?');
              left = left - 1;
              console.log('left:', left);
              if (!left) {
                reject(error);
              } else {
                console.log('retry logic?');
                return wait(options.retryDelay).then(() => execute(left));
              }
            })
            .then(resolve);
        });
      };

      return execute(retriesLeft);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithRetry;
  }
})();

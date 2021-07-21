(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { retries: 3, retryDelay: 1000 };
  var fetchRetry = require('fetch-retry');

  nx.fetchWithRetry = function (inFetch) {
    var enhancedFetch = fetchRetry(inFetch);
    return function (inUrl, inOptions) {
      var options = nx.mix(null, defaults, inOptions);
      return enhancedFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithRetry;
  }
})();

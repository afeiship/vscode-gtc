(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('overlay', [function () {
      return {
        restrict: 'E',
        template: '<div class="ng-widget-overlay {{cssClass}}" data-visible="{{visible}}"></div>',
        scope: true
      };
    }]);

})();

(function () {
  'use strict';

  var extend = angular.extend;
  var jqLite = angular.element;

  angular.module('nx.widget').factory('nxOverlay', [
    '$rootScope',
    '$timeout',
    '$compile',
    '$sce',
    function ($rootScope, $timeout, $compile, $sce) {

      var scope, element;
      var defaults = {
        cssClass: '',
        visible: false
      };

      initial();

      return {
        init: initial,
        visible: visible,
        destroy: destroy
      };

      function initial() {
        scope = extend($rootScope.$new(true), defaults);

        element = scope.element = $compile('<overlay></overlay>')(scope);
        jqLite(document.body).append(element);
      }

      function visible(inValue) {
        $timeout(function(){
          scope.visible = !!inValue;
        },0);
      }

      function destroy() {
        scope.$destroy();
        element.remove();
      }

    }]);
})();

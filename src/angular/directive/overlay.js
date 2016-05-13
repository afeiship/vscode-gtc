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

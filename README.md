#angular-overlay
AngularJS directive used to prevent the content below it.


##usage:
+ html part
```html
<link rel="stylesheet" type="text/css" href="../dist/css/overlay.css"/>
<script type="text/javascript" src="../bower_components/angular/angular.js"></script>
<script type="text/javascript" src="../dist/js/angular-overlay.js"></script>
```

+ javascript part:
```javascript
var TestModule = angular.module('TestApp', ['nx.widget'])
    .controller('MainCtrl', function ($scope, nxOverlay) {
      $scope.show = function () {
        nxOverlay.visible(true);
      };

      $scope.hide = function () {
        nxOverlay.visible(false);
      };
    });
```

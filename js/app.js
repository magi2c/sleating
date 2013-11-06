var app = angular.module('myApp', ['pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('es_ES');
}]);

app.factory('menu', function() {
  return new Menu();
});



app.controller('AppCtrl', ['$scope', '$http', 'menu', function ($scope, $http, menu) {

    $scope.getFoods = function() {
        $http.get("doc/foods.json").success(function(jsonF) {
            $scope.foods = jsonF;
        
        $scope.groupShow = {};
        for (groupKey in $scope.foods) {
            $scope.groupShow[groupKey] = false;
        }

        });
    };

    $scope.groupShowToggle = function(groupKey) {
        $scope.groupShow[groupKey] = ! $scope.groupShow[groupKey]
    }


    $scope.getFoods();
    $scope.menu = menu;

}]);

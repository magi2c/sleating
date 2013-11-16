var app = angular.module('sleatingApp', ['pascalprecht.translate']);

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



app.controller('AppCtrl', ['$scope', '$http', 'menu', '$translate', function ($scope, $http, menu, $translate) {

    $scope.getFoods = function() {
        $http.get("doc/foods.json").success(function(jsonF) {
            $scope.foods = jsonF;
        
        $scope.groupShow = {};
        for (groupKey in $scope.foods) {
            $scope.groupShow[groupKey] = false;
        }

        });
    }

    $scope.languages = [
        {name:'Spanish', key:'es_ES'},
        {name:'English', key:'en_EN'}
    ];
    $scope.language = $scope.languages[0];
    $scope.changeLanguage = function (lang) {
        $translate.uses(lang.key);
    };

    $scope.groupShowToggle = function(groupKey) {
        $scope.groupShow[groupKey] = ! $scope.groupShow[groupKey]
    }

    $scope.groupShowClass = function(groupKey) {
        if ($scope.groupShow[groupKey]) {
            return 'minus';
        }
        return 'plus';
    }


    $scope.getFoods();
    $scope.menu = menu;

}]);

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



app.controller('AppCtrl', ['$scope', '$http', 'menu', function ($scope, $http, menu) {

    $scope.getFoods = function() {
        var self = this;
        $http.get("doc/foods.json").success(function(jsonF) {
            self.foods = jsonF;
        });

        return self.foods;
    };

    $scope.foods = $scope.getFoods();
    $scope.menu = menu;




/*    $scope.resetTypeDisabled = function() {
        $scope.typeDisabled = {hydrate: "",neutral: "",fat: "",fruit: ""};
    };
    $scope.resetTypeDisabled();


    $scope.isFoodsCheck = function(food) {
        var index = $scope.foodsCheck.indexOf(food)
        return (index >= 0);
    };


    $scope.inFoodsCheck = function(food) {
        var index = $scope.foodsCheck.indexOf(food)
        if (index >= 0){
            $scope.foodsCheck.splice(index, 1);
        } else {
            $scope.foodsCheck.push(food);
        }
    };

    $scope.activeTypeDisabled = function() {
        angular.forEach($scope.foodsCheck, function(food) {

            switch (food.type) {
                case 'fruit':
                    $scope.typeDisabled['hydrate'] = 'food-disabled';
                    $scope.typeDisabled['fat'] = 'food-disabled';
                    $scope.typeDisabled['neutral'] = 'food-disabled';
                    break;
                case 'hydrate':
                    $scope.typeDisabled['fruit'] = 'food-disabled';
                    $scope.typeDisabled['fat'] = 'food-disabled';
                    break;
                case 'neutral':
                    $scope.typeDisabled['fruit'] = 'food-disabled';
                    break;
                case 'fat':
                    $scope.typeDisabled['fruit'] = 'food-disabled';
                    $scope.typeDisabled['hydrate'] = 'food-disabled';
                    break;
            }
        });
    };


    $scope.isFoodDisabled = function(food) {
        if ($scope.addFoodClass(food) == 'food-disabled') {
            return true;
        }

        return false;
    };

    $scope.addFoodClass = function(food) {
        if ($scope.isFoodsCheck(food)) {
            return 'food-check';
        }

        if (food.phase == 'Stay' && $scope.thin == true) {
            return 'food-disabled';
        }

        return $scope.typeDisabled[food.type];
    };


    $scope.change = function(food) {
        $scope.inFoodsCheck(food);
        $scope.resetTypeDisabled();
        $scope.activeTypeDisabled();
    };*/



}]);

function AppCtrl($scope, $http, $templateCache, $sce) {

    $scope.foodsCheck = [];
    $scope.thin = true;

    $scope.getFoods = function() {
        var self = this;
        $http.get("doc/foods.json").success(function(jsonF) {
            self.foods = jsonF;
        });

        return self.foods;
    };
    $scope.foods = $scope.getFoods();

    $scope.resetTypeDisabled = function() {
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
            $scope.typeDisabled[food.type] = 'food-disabled';
        });
        //$scope.checked = true;
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
        $scope.resetTypeDisabled();

        $scope.inFoodsCheck(food);

        $scope.activeTypeDisabled();
    };




}
function AppCtrl($scope) {
    $scope.foods = {'hydrate' : [
        {'name': 'arroz', 'type': 'hydrate', 'phase':'1'},
        {'name': 'maíz', 'type': 'hydrate', 'phase':'1'},
        {'name': 'pan', 'type': 'neutral', 'phase':'1'},
        {'name': 'pasta de sopa', 'type': 'hydrate', 'phase':'1'}
        ]};

    $scope.foodsCheck = [];

    $scope.typeDisabled = {
        hydrate: "",
        neutral: "",
        fat: "",
        fruit: ""
    };

    $scope.resetTypeDisabled = function() {
        $scope.typeDisabled = {
            hydrate: "",
            neutral: "",
            fat: "",
            fruit: ""
        };
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
        $scope.checked = true;
    };


    $scope.change = function(food) {
        //console.log(food);

        $scope.resetTypeDisabled();

        $scope.inFoodsCheck(food);

        $scope.activeTypeDisabled();

        console.log($scope.foodsCheck);
        console.log($scope.typeDisabled);
    };




}
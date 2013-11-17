var Menu = function() {
    var self = this;
	this.foodsCheck = [];
	this.thin = true; //ToDo change for phase
	this.typeDisabled = resetTypeDisabled();

	function resetTypeDisabled() {
	  	return {hydrate: "",neutral: "",fat: "",fruit: ""};
	}
	

    function isFoodsCheck(food) {
        var index = self.foodsCheck.indexOf(food)
        return (index >= 0);
    }
    
    function toggleInFoodsCheck(food) {
        var index = self.foodsCheck.indexOf(food)
        if (index >= 0){
            self.foodsCheck.splice(index, 1);
        } else {
            self.foodsCheck.push(food);
        }
    }

	function activeTypeDisabled() {
		self.typeDisabled = resetTypeDisabled();
        angular.forEach(self.foodsCheck, function(food) {
            switch (food.type) {
                case 'fruit':
                    self.typeDisabled['hydrate'] = Menu.FOOD_DISABLED;
                    self.typeDisabled['fat'] = Menu.FOOD_DISABLED;
                    self.typeDisabled['neutral'] = Menu.FOOD_DISABLED;
                    break;
                case 'hydrate':
                    self.typeDisabled['fruit'] = Menu.FOOD_DISABLED;
                    self.typeDisabled['fat'] = Menu.FOOD_DISABLED;
                    break;
                case 'neutral':
                    self.typeDisabled['fruit'] = Menu.FOOD_DISABLED;
                    break;
                case 'fat':
                    self.typeDisabled['fruit'] = Menu.FOOD_DISABLED;
                    self.typeDisabled['hydrate'] = Menu.FOOD_DISABLED;
                    break;
            }
        });
    }

	this.getFoodClass = function(food) {
        if (isFoodsCheck(food)) {
            return Menu.FOOD_CHECK;
        }

        if (food.phase == Menu.PHASE_STAY && self.thin == true) {
            return Menu.FOOD_DISABLED;
        }

        return self.typeDisabled[food.type];
    }

    this.isFoodDisabled = function(food) {
        if (this.getFoodClass(food) == Menu.FOOD_DISABLED) {
            return true;
        }

        return false;
    }

    this.toggleFood = function(food) {
        toggleInFoodsCheck(food);
        activeTypeDisabled();
    }

}
Menu.FOOD_CHECK 	= 'food-check';
Menu.FOOD_DISABLED 	= 'food-disabled';
Menu.PHASE_STAY	   	= 'Stay';

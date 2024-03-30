app.controller('ShopController', function ($scope, $http) {
    $scope.myWelcome = [];
    $scope.isLoading = true;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/products'
    }).then(function success(response) {
        $scope.myWelcome = response.data;
        $scope.def = response.data;
        $scope.isLoading = false;
    }, function error(response) {
        console.log(response);
        $scope.isLoading = false;
    });

    $scope.new = function () {
        $scope.myWelcome = angular.copy($scope.def);
        console.log($scope.myWelcome);

    };

    $scope.asc = function () {
        if ($scope.isLoading) {
            return;
        }
        $scope.myWelcome.sort(function (a, b) {
            return a.price - b.price;
        });
        console.log($scope.myWelcome);

    };

    $scope.des = function () {
        $scope.myWelcome.sort(function (a, b) {
            return b.price - a.price;
        });
        console.log($scope.myWelcome);

    };
});
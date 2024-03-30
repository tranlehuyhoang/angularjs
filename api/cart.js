app.controller('CCL', ['$scope', '$http', function ($scope, $http) {

    $http({
        method: 'GET',
        url: 'http://localhost:3000/carts'
    }).then(function success(response) {
        // Xử lý thành công
        console.log(response);
        $scope.carts = response.data
    }, function error(response) {
        console.log(response);
    });
    $http({
        method: 'GET',
        url: 'http://localhost:3000/products'
    }).then(function success(response) {
        // Xử lý thành công
        console.log(response);
        $scope.details = response.data
        $scope.carts.forEach((cart, index) => {
            const detail = $scope.details.find(detail => cart.product_id == detail.id);
            if (detail) {
                $scope.carts[index].product = detail;

            }
        });
        console.log('$scope.carts', $scope.carts)
        $scope.totalAmount = 0;

        $scope.carts.forEach(cart => {
            $scope.totalAmount += cart.quantity * cart.product.price;
        });
    }, function error(response) {
        console.log(response);
    });
}]);

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


    $scope.dele = function (id) {

        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/carts/' + id

        }).then(function success(response) {
        }, function error(response) {
            // Xử lý lỗi
            console.log(response);
        });

    };
    $scope.checkout = function () {
        $scope.carts.forEach(function (item) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/carts/' + item.id
            }).then(function success(response) {
                // Handle success
                console.log('Item with ID ' + item.id + ' deleted successfully');
            }, function error(response) {
                // Handle error
                console.log('Error deleting item with ID ' + item.id + ':', response);
            });
        });
    };
}]);

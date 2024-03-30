app.controller('DetailController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    var id = $routeParams.id;
    $scope.quantity = 1;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/products'
    }).then(function success(response) {
        $scope.pdDetail = response.data[id];

    }, function error(response) {
        // Handle error
    });

    $scope.submitForm = function (id) {
        var params = {
            product_id: id,
            quantity: $scope.quantity,
        };
        // Thực hiện yêu cầu POST để lưu dữ liệu biểu mẫu
        $http({
            method: 'POST',
            url: 'http://localhost:3000/carts',
            data: params
        }).then(function success(response) {
            // Xử lý thành công
            console.log(response);
        }, function error(response) {
            // Xử lý lỗi
            console.log(response);
        });

    };
}]);

app.controller('RgCL', ['$scope', '$http', function ($scope, $http) {
    $scope.submitForm = function () {
        var params = {
            name: $scope.name,
            address: $scope.address,
            phone: $scope.phone,
            email: $scope.email,
            password: $scope.password
        };

        if ($scope.myForm.$valid) {
            // Thực hiện yêu cầu POST để lưu dữ liệu biểu mẫu
            $http({
                method: 'POST',
                url: 'http://localhost:3000/users',
                data: params
            }).then(function success(response) {
                // Xử lý thành công
                console.log(response);
            }, function error(response) {
                // Xử lý lỗi
                console.log(response);
            });
        }
    };
}]);

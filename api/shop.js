app.controller('ShopController', function ($scope, $http) {
    $scope.default = [];
    $scope.asc = [];
    $scope.des = [];
    $scope.view = 1;
    $scope.isDataLoaded = false; // Biến kiểm tra xem dữ liệu đã được tải từ API hay chưa

    function fetchData() {

        $http({
            method: 'GET',
            url: 'http://localhost:3000/products'
        }).then(function success(response) {
            $scope.default = response.data;
            $scope.asc = angular.copy(response.data).sort(function (a, b) {
                return a.price - b.price;
            });
            $scope.des = angular.copy(response.data).sort(function (a, b) {
                return b.price - a.price;
            });
            console.log('$scope.default', $scope.default);
            console.log('$scope.asc', $scope.asc);
            console.log('$scope.des', $scope.des);
            $scope.isDataLoaded = true; // Đánh dấu rằng dữ liệu đã được tải từ API
            console.log($scope.isDataLoaded)
            console.log($scope.view)
        }, function error(response) {
            // Xử lý lỗi
        });
    }

    if (!$scope.isDataLoaded) {
        fetchData(); // Lấy dữ liệu từ API nếu chưa được tải
    }

    $scope.new = function () {

        $scope.view = 1;
    };

    $scope.sortAsc = function () {

        $scope.view = 2;
        if (!$scope.isDataLoaded) {
            fetchData(); // Lấy dữ liệu từ API nếu chưa được tải
        }
        console.log($scope.view)

    };

    $scope.sortDesc = function () {

        $scope.view = 3;
        if (!$scope.isDataLoaded) {
            fetchData(); // Lấy dữ liệu từ API nếu chưa được tải
        }
    };
});
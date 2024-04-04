app.controller('ShopController', function ($scope, $http) {
    $scope.default = [];
    $scope.filteredData = []; // Dữ liệu được lọc
    $scope.currentPage = 0; // Trang hiện tại
    $scope.itemsPerPage = 4; // Số lượng sản phẩm trên mỗi tran
    $scope.searchText = '';

    $http({
        method: 'GET',
        url: 'http://localhost:3000/products'
    }).then(function success(response) {
        $scope.default = response.data;
        $scope.filteredData = response.data;
        $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
    }, function error(response) {
        // Xử lý lỗi
    });

    // Lọc dữ liệu theo giá tăng dần
    $scope.sortAsc = function () {
        $scope.filteredData = angular.copy($scope.default).sort(function (a, b) {
            return a.price - b.price;
        });
        $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
        $scope.currentPage = 0;
    };

    // Lọc dữ liệu theo giá giảm dần
    $scope.sortDesc = function () {
        $scope.filteredData = angular.copy($scope.default).sort(function (a, b) {
            return b.price - a.price;
        });
        $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
        $scope.currentPage = 0;
    };

    // Lấy dữ liệu cho trang hiện tại
    $scope.getCurrentPageItems = function () {
        var startIndex = $scope.currentPage * $scope.itemsPerPage;
        var endIndex = startIndex + $scope.itemsPerPage;

        // Lọc dữ liệu dựa trên từ khóa tìm kiếm
        var filteredItems = $scope.filteredData.filter(function (item) {
            return item.title.toLowerCase().includes($scope.searchText.toLowerCase());
        });

        return filteredItems.slice(startIndex, endIndex);
    };

    // Chuyển đến trang trước
    $scope.previousPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    // Chuyển đến trang kế tiếp
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.numPages - 1) {
            $scope.currentPage++;
        }
    };

    // Chuyển đến trang cụ thể
    $scope.goToPage = function (index) {
        $scope.currentPage = index;
    };
});
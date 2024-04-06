app.controller('ShopController', function ($scope, $http) {
    $scope.default = [];
    $scope.filteredData = []; // Dữ liệu được lọc
    $scope.currentPage = 0; // Trang hiện tại
    $scope.itemsPerPage = 6; // Số lượng sản phẩm trên mỗi tran
    $scope.searchText = '';
    $scope.categories = [];
    $scope.selectedCategories = [];

    // Lấy danh sách các danh mục duy nhất


    $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
    $http({
        method: 'GET',
        url: 'http://localhost:3000/products'
    }).then(function success(response) {
        $scope.default = response.data;
        $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
        $scope.default = response.data;
        $scope.filteredData = response.data;
        $scope.filteredData.forEach(function (item) {
            if ($scope.categories.indexOf(item.category) === -1) {
                $scope.categories.push(item.category);
            }
        });
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

        // Lọc dữ liệu dựa trên từ khóa tìm kiếm và danh mục đã chọn
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
    $scope.filterByCategory = function () {
        // Lọc dữ liệu dựa trên danh mục được chọn
        $scope.filteredData = $scope.default.filter(function (item) {
            return $scope.selectedCategories[item.category];
        });

        $scope.numPages = Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
        $scope.currentPage = 0;
    };
    $scope.truncateString = function (str, limit) {
        if (str.length <= limit) {
            return str;
        } else {
            return str.substring(0, limit) + "...";
        }
    }
});

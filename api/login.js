app.controller('LgCL', ['$scope', '$http', function ($scope, $http) {
    storedUsers = localStorage.getItem('users');

    var users = JSON.parse(storedUsers);

    // Access the name property of the first user
    $scope.userName = users[0].phone;
    $scope.submitForm = function () {
        var params = {
            phone: $scope.phone,
            password: $scope.password
        };

        if ($scope.myForm.$valid) {
            // Thực hiện yêu cầu GET để lấy dữ liệu từ máy chủ
            $http({
                method: 'GET',
                url: 'http://localhost:3000/users',
                params: params
            }).then(function success(response) {
                var users = response.data;
                var isLoggedIn = false;

                // Lặp qua danh sách người dùng và kiểm tra trùng khớp
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    if (user.phone === $scope.phone && user.password === $scope.password) {
                        isLoggedIn = true;
                        break;
                    }
                }

                if (isLoggedIn) {
                    // Lưu mảng users vào LocalStorage
                    localStorage.setItem('users', JSON.stringify(users));


                    // Hiển thị thông báo đăng nhập thành công
                    alert("Đăng nhập thành công");
                } else {
                    // Hiển thị thông báo đăng nhập thất bại
                    alert("Đăng nhập thất bại");
                }
            }, function error(response) {
                // Xử lý lỗi
                console.log(response);
            });
        }
    };
}]);
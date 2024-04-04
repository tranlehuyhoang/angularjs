app.controller('FogotController', ['$scope', '$http', function ($scope, $http) {

    storedUsers = localStorage.getItem('users');
    var users = JSON.parse(storedUsers);
    // Access the name property of the first user
    $scope.userNames = users[0].phone;
    $scope.id = users[0].id;
    $scope.pass = users[0].password;
    // Lấy thông tin người dùng từ localStorage
    $scope.submitForms = function () {
        var data = {
            password: $scope.password
        };

        if ($scope.myForm.$valid) {
            // Perform a PUT request to update the user's password on the server
            $http({
                method: 'PATCH',
                url: 'http://localhost:3000/users/' + $scope.id,
                data: data
            }).then(function success(response) {
                // Handle the successful response
                console.log(response);
            }, function error(response) {
                // Handle the error
                console.log(response);
            });
        }
    };
}]);
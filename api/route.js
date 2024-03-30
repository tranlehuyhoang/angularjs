var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../components/shop.html",
            controller: "ShopController"

        })
        .when("/shop", {
            templateUrl: "../components/shop.html",
            controller: "ShopController"
        })
        .when("/cart", {
            templateUrl: "../components/cart.html",
            controller: "CCL"

        })
        .when("/login", {
            templateUrl: "../components/login.html",
            controller: "LgCL"
        })
        .when("/register", {
            templateUrl: "../components/register.html",
            controller: "RgCL"
        })
        .when("/chitiet", {
            templateUrl: "../components/chitiet.html",
            controller: "DetailController"
        })
        .otherwise({
            redirecTo: '/home'
        })

});

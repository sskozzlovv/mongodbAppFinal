(function () {
    'use strict';

    angular
        .module('myApp', ['ui.bootstrap', 'dataGrid', 'pagination'])
        .controller('myAppController', MyAppController)
        .factory('myAppFactory', MyAppFactory);

    MyAppController.$inject = ['$scope', 'myAppFactory'];
    MyAppFactory.$inject = ['$http'];

    function MyAppController($scope, myAppFactory) {

        $scope.gridOptions = {
            data: [],
            getData: myAppFactory.getOrdersData,
            sort: {
                predicate: 'name',
                direction: 'asc'
            }
        };
        $scope.gridActions = {};
        $scope.saveOrder = myAppFactory.saveOrder;
        $scope.deleteOrder = myAppFactory.deleteOrder;
    }

    function MyAppFactory($http) {
        //var herokuDomain = 'https://server-pagination.herokuapp.com';
        //var herokuDomain = 'http://localhost:8080';
        var herokuDomain = '';
        return {
            getOrdersData: getOrdersData,
            saveOrder: saveOrder,
            deleteOrder: deleteOrder
        };

        function getOrdersData(params, callback) {
            $http.get(herokuDomain + '/orders' + params).success(function (response) {
                callback(response.orders, response.ordersCount);
            });
        }
        function saveOrder(params) {
            $http.post(herokuDomain + '/order',params).success(function(res){
                //$scope.filtered = res;
            });
        }
        function deleteOrder(params, callback) {
            $http.delete(herokuDomain + '/order/' + id).success(function(res) {
                //$scope.fitlered = res;
            })
        }
    }
})();

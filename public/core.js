angular.module('usersApp', ['dataGrid', 'pagination']).controller('usersController', ['$scope','$http', function($scope, $http){
    $scope.gridOptions = {
        data: [], //required parameter - array with data
        getData: getUsersData
        //sort: {
        //    predicate: 'companyName',
        //    direction: 'asc'
        //}
    };

    $scope._gridActions = {};

    $scope.save = function(){
        $http.post('/user', $scope.form).success(function(res){
            $scope.users = res;
        });
    };
    $scope.delete = function(id){
        $http.delete('/user/' + id).success(function(res) {
            $scope.users = res;
        })
    };
    $scope.getData = function () {
        $http.get('/users').success(function(res) {
            $scope.gridOptions.data = res;
            //$scope.users = res;
        })
    };
    function getUsersData(params, callback) {
        $http.get('/users' + params).success(function (response) {
            callback(response.users, response.usersCount);
        });
    };

    //$scope.getData();
}]);
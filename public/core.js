angular.module('usersApp', ['dataGrid', 'pagination']).controller('usersController', ['$scope','$http', function($scope, $http){
    //var herokuDomain = 'https://server-pagination.herokuapp.com';
    //var herokuDomain = 'http://protected-journey-68520.herokuapp.com';
    var herokuDomain = '';
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
        $http.post(herokuDomain + '/user', $scope.form).success(function(res){
            $scope.users = res;
        });
    };
    $scope.delete = function(id){
        $http.delete(herokuDomain + '/user/' + id).success(function(res) {
            $scope.users = res;
        })
    };

    function getUsersData(params, callback) {
        $http.get(herokuDomain + '/users' + params).success(function (response) {
            callback(response.users, response.usersCount);
        });
    };

}]);
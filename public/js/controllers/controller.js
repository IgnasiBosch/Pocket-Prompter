var app = angular.module('app', ['selectize']);
app.controller('AppCtrl', function ($scope, $http) {

    var refresh = function () {
        $http.get('/command').success(function (response) {
            $scope.commands = response;
            $scope.command = '';
            sel.clear();
            $http.get('/tags').success(function (response) {
                var arTags = [];
                for (i in response) {
                    arTags.push({
                        value: response[i],
                        text: response[i]
                    });
                }
                sel.addOption(arTags);
            });
        });
    };

    refresh();


    $scope.addCommand = function () {
        $http.post('/command', $scope.command).success(function () {
            refresh();
        });
    };

    $scope.removeCommand = function (id) {
        $http.delete('/command/' + id).success(function () {
            refresh();
        });
    };

    $scope.editCommand = function (id) {
        $http.get('/command/' + id).success(function (response) {
            $scope.command = response;
            sel.setValue(response.tags);
        });
    };

    $scope.updateCommand = function (id) {
        $http.put('/command/' + $scope.command._id, $scope.command).success(function () {
            refresh();
        });
    };

    $scope.clearCommand = function () {
        $scope.command = '';
    };

    $scope.searchCommand = function(){
        if($scope.command.tags) {
            $http.post('/search', $scope.command).success(function (response) {
                $scope.commands = response;
            });
        }else{
            refresh();
        }
    }

});

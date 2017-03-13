
var app = angular.module("usersApp", ['ui.bootstrap']);

app.controller('usersController', function($scope, $http) {
    $http({
        method: 'GET',
        url: 'data/users.json'})
        .then( function (response) {
            if(response.data && response.data.users && response.data.users.length) {

                $scope.users = response.data.users;

            }
            else alert('Sorry, no data');
        });

    $scope.search = function (item) {
      if ( $scope.searchText == undefined ) {
          return true;
      }else if ( item.first_name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
          item.last_name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
          return true;
      }else return false;
    };

    $scope.pageSize = 4;
    $scope.currentPage = 1;

    $scope.previousPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
        return $scope.currentPage;
    };

    $scope.nextPage = function () {
        if($scope.currentPage < Math.ceil($scope.users.length / $scope.pageSize)) {
            $scope.currentPage++;
        }
        return $scope.currentPage;
    };
});

app.controller('ModalCtrl', function($scope, $uibModal) {
    $scope.showModal = function(user) {
        $scope.opts = {
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl : 'partials/modal.html',
            controller : ModalInstanceCtrl,
            resolve: {
                user: function() {
                    return user;
                }
            }
        };

        var modalInstance = $uibModal.open($scope.opts);
    };
});

var ModalInstanceCtrl = function($scope, $modalInstance, $modal, user) {
    $scope.user = user;
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
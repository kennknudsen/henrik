'use strict';

app.controller('profileCtrl', ['$scope', 'User', function( $scope, User ) {
    $scope.user = User
}]);

app.controller('edit-user', ['$scope', '$mdDialog', 'User', function( $scope, $mdDialog, User ) {
    var type;
    function DialogController( $scope, $mdDialog ) {

        $scope.type = type;

        if( type == "subscription" ){
            $scope.header = { title: 'Ændre abonnement' };
        }

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            Projects.postProject($scope.project).then(function (response) {
                // SOME GLOBAL "SUCCESS FALSE" I SHARED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                Projects.add_to_global_scope(response.project)
            });
            $mdDialog.hide();
        };
    }

    $scope.editUser = function( ev, _type ) {

        type = _type;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../views/henrik/profile.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };
}]);
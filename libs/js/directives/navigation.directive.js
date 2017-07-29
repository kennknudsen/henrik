'use strict';

app.directive('navigation', ['$rootScope', '$mdDialog', '$state', '$stateParams', function( $rootScope, $mdDialog, $state, $stateParams ) {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/navigation.templates.html',
        link: function( scope ){
            scope.projectId = $stateParams.projectId;
            /*
            scope.nextState = function(){
                var next = $rootScope.queue[ $rootScope.currentState ];

                $rootScope.currentState++;
                $state.go('app.byId', { 'itemId':next.id, 'grandParent':next.grandParent });
            };
            */

           scope.moreInfo = function(ev) {
               $mdDialog.show(
                   $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#popupContainer')))
                       .clickOutsideToClose(true)
                       .title('More info about why images and docs are good')
                       .textContent('You can specify some description text in here.')
                       .ariaLabel('Alert Dialog Demo')
                       .ok('Got it!')
                       .targetEvent(ev)
               );
           }
        }
    };
}]);
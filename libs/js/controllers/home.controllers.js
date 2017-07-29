'use strict';

// https://scotch.io/tutorials/making-skinny-angularjs-controllers
app.controller('homeCtrl', ['$scope', 'Projects', function( $scope, Projects ) {
    $scope.projects_started = Projects.projectsStarted().length > 0 ? true : false;
    $scope.projects_sent = Projects.projectsSent().length > 0 ? true : false;
}]);
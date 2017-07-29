'use strict';

app.controller('haand-projects', ['$scope', '$filter', function( $scope, $filter ) {

    var projects = [];

    for( var i = 0; i < 13; i++){
        projects.push({ id: i, address: "Aesterhåb 1", zip: "8300", city: "Odder", owner: "Penn Knudsen", sent: false } )
    }

    for( var i = 0; i < 3; i++){
        projects.push({ id: i, address: "Aesterhåb 1", zip: "8300", city: "Odder", owner: "Penn Knudsen", sent: false, new: true } )
    }

    for( var i = 3; i < 12; i++){
        projects.push( { id: i, address: "Vesterhåb 1", zip: "8300", city: "Odder", owner: "Kenn Knudsen", ended: true } )
    }

    $scope.projectsEnded = $filter('filter')( projects, { ended: true });
    $scope.projectsWorking = $filter('filter')( projects, { ended: '!true' });

    $scope.countProjectsEnded = function(){
        var filteredProjects = $filter('filter')( $scope.projectsEnded, $scope.query.search );
        return filteredProjects.length
    };

    $scope.endProject = function(){
        alert("END PROJECT");
    };

    $scope.selectProject = function(){
        alert("SELECT PROJECT");
    };

    /* WORKING PROJECTS */
    $scope.working = {};

    /* ENDED PROJECTS */

    $scope.selected = [];

    $scope.query = {
        order: 'address',
        limit: 5,
        page: 1
    };

    function success(desserts) {
        $scope.desserts = desserts;
    }

    $scope.getDesserts = function () {

        //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;

    };
}]);

app.controller('haand-new-project', ['$scope', function( $scope ) {
    $scope.header = { title: 'Nyt projekt', subtitle: 'Gem og send tom projekt til kunde' };
}]);

var app_testing = global.app;
'use strict';

app.directive('cardHeader', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/card/header.templates.html',
        link: function( scope, element, attrs ){
            console.log(scope.header)
        }
    };
});


'use strict';

app.directive('helpPage', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/help-page.templates.html',
        scope: {
            help: '=help'
        }
    };
});

app.directive('helpPageFrame', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/help-page-frame.templates.html',
        scope: {
            help: '=help'
        }
    };
});
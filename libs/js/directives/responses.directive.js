'use strict';

app.directive('title', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/title.templates.html',
        link: function( scope, element, attrs ){
            scope.non_selected = attrs.hasOwnProperty("nonselected") ? true : false;
            scope.selected = attrs.hasOwnProperty("selected") ? true : false;
        }
    };
});

app.directive('helpResponse', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/help-response.templates.html'
    };
});

app.directive('files', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/files.templates.html'
    };
});

app.directive('addFile', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/addFile.templates.html'
    };
});

app.directive('images', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/images.templates.html'
    };
});

app.directive('addImage', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/addImage.templates.html'
    };
});

app.directive('actions', function() {
    return {
        restrict:'E',
        //replace: 'true',
        templateUrl: '../views/templates/responses/actions.templates.html'
    };
});

app.directive('actionAdd', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/action-add.templates.html',
        scope:{
            action: "=action",
            item: "=item",
            handleResponse: "=handleResponse"
        }
    };
});

app.directive('actionRemove', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/action-remove.templates.html',
        scope:{
            action: "=action",
            item: "=item",
            handleResponse: "=handleResponse"
        }
    };
});

app.directive('actionSelect', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/action-select.templates.html',
        scope:{
            action: "=action",
            item: "=item",
            handleResponse: "=handleResponse"
        }
    };
});
app.directive('other', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/other.response.templates.html'
    };
});

app.directive('responsesBoolean', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/boolean.response.templates.html',
        link: function( scope, element, attrs ){
            scope.value = attrs.hasOwnProperty("true") ? true : false;
        }
    };
});

app.directive('responsesRadio', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/responses/radio.response.templates.html',
        link: function( scope, element, attrs ){
            scope.value = attrs.hasOwnProperty("true") ? true : false;
        }
    };
});

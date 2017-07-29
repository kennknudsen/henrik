'use strict';

app.directive('inputTitle', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/title.templates.html'
    };
});

app.directive('inputAddress', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/address.templates.html'
    };
});

app.directive('inputName', ['User', function( User ) {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/name.templates.html',
        link: function( scope, element, attrs ){
            var pre = attrs.hasOwnProperty("owner") ? "Ejer" : "Dit";
            scope.firstName = { label: pre + " fornavn", value: User.getFirstName()  };
            scope.lastName = { label: pre + " efternavn", value: User.getLastName() };
        }
    };
}]);

app.directive('inputEmail', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/email.templates.html'
    };
});

app.directive('inputDescription', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/description.templates.html'
    };
});

app.directive('inputNewsletter', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/newsletter.templates.html'
    };
});

app.directive('inputSystemMsg', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/systemMessages.templates.html'
    };
});

app.directive('inputSubscription', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/subscription.templates.html'
    };
});

app.directive('inputActionsCard', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/templates/form/actions.templates.html',
        link: function( scope, element, attrs ){
            scope.saveAndSend = attrs.hasOwnProperty("saveandsend") ? true : false;
        }
    };
});
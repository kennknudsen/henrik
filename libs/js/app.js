'use strict';

global.app = angular.module('app', ['ui.router', 'ngSanitize', 'ngMaterial', 'ngMessages', 'md.data.table'])
    .constant("API", {
        "APIBase": "api",
        "routes": {
            "user": "user",
            "items": "items",
            "projects": "projects",
            "rooms": "rooms"
        }
    })
    .constant("Templates", {
        "url": {
            xxx: "views/templates/xxx/"
        }
    })
    .constant("Navigation", [
        { title: "xxx", state: "xxx", layout: true, page: true }
    ])

    .config(function( $mdIconProvider, $mdThemingProvider ) {
        $mdIconProvider     //TROR IKKE DE ER I BRUG, MEN KUNNE VÆRE GODT!!!!!!!!!!!!!!!!!!!!!!!
            .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
            .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
        // Configure a dark theme with primary foreground yellow ///////////////INPUT //////////////////////
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    })
    /* PRODUCTION - https://docs.angularjs.org/guide/production
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);
     */
    .run(function( $rootScope ) {
        $rootScope.currentState = 0;
    });

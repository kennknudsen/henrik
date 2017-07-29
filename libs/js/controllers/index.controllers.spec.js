'use strict';

describe('index.controller', function() {

    beforeEach( module('app') );

    describe('app controller', function(){

        var scope, appCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            appCtrl = $controller('appCtrl', { $scope: scope });
        }));

        it('is defined', inject(function() {
            //spec body
            expect( appCtrl ).toBeDefined();
        }));

    });
});
'use strict';

describe('haand.controller', function() {

    beforeEach( module('app') );

    describe('haand controller', function(){

        var scope, haandProjects;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            haandProjects = $controller('haand-projects', { $scope: scope });
        }));

        it('is defined', inject(function() {
            //spec body
            expect( haandProjects ).toBeDefined();
        }));

    });
});
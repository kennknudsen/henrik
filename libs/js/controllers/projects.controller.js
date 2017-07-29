'use strict';

app.controller('projects', ['$rootScope', '$scope', '$filter', function( $rootScope, $scope, $filter ) {

    $rootScope.title = "Igangværende projekter";

    $scope.endProject = function(){
        alert("END PROJECT");
    };

    $scope.selectProject = function(){
        alert("SELECT PROJECT");
    };


    /* SEARCHING - TJEK AT DET ER KORREKT */
    $scope.countProjectsEnded = function(){
        var filteredProjects = $filter('filter')( $scope.projectsEnded, $scope.query.search );
        return filteredProjects.length
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

app.controller('projects-ended', ['$scope', function( $scope ) {
     /*
    projects: ['Projects', function( Projects ){
        return Projects.getProjects().then(function ( response ) {
            Projects.set_global_scope( response.projects )
            return response.projects;
        });
    }]
    */
}]);

app.controller('new-project', [ '$scope', '$mdDialog', '$q', '$timeout', 'User', 'Projects', function( $scope, $mdDialog, $q, $timeout, User,Projects ) {


    function DialogController($scope, $mdDialog) {
        var addressHelp = [{ t: "Adressen hvor arbejdet skal udføres." }, { t: "Eksempel:", bold: true  }, { t: "Vesterhåb 5"  }, { t: "8300 Odder"  }];

        $scope.searchSentTo = false;

        $scope.header = { title: 'Opret nyt projekt' };
        $scope.project = {
            title: {
                help: {
                    title: "Overskrift",
                    text: "Angiv en kort og præcis overskift til dig projekt, som kort beskriver hvad du skal have lavet. Max 120 tegn."
                }
            },
            address: {
                address: {
                    help: {
                        title: "Adresse",
                        texts: addressHelp
                    }
                },
                zip: {
                    help: {
                        title: "Zip",
                        texts: addressHelp
                    }
                },
                city: {
                    help: {
                        title: "By",
                        texts: addressHelp
                    }
                }
            },
            description: {
                help: {
                    title: "Beskrivelse",
                    texts: "Beskriv så godt du kan hvad du skal have lavet"
                }
            },
            sentTo: []
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function() {
            var project = {};
            project.title = $scope.project.title.value;
            project.address = { address: $scope.project.address.address.value, zip: $scope.project.address.zip.value, city: $scope.project.address.city.value };
            project.description = $scope.project.description.value;

            Projects.postProject( project ).then(function ( response ) {
                // SOME GLOBAL "SUCCESS FALSE" I SHARED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                Projects.add_to_global_scope( response.project )
                $mdDialog.hide();
            });
        };


        $scope.setFocus = function( property ){
            var focus = $scope.project[property];

            if( property == "address" ){
                focus = $scope.project.address[property];
            }

            $scope.help =  focus.help;

            /*
            Some guidance
            send til kunde med anmodning om at udfylde (håndværker initere)
            Vælg om flere kan deltage - skriv hvorfor det er en god ide)
            */
        };




        /* SEARCH SENT TO */
        $scope.isDisabled = false;
        $scope.simulateQuery = true;

        // list of `state` value/display objects
        $scope.states             = loadAll();
        $scope.querySearch        = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange   = searchTextChange;

        $scope.newState = newState;

        /* OWN */
        $scope.removeSentTo = removeSentTo;

        function removeSentTo( item ){
            var index = _.findIndex( $scope.project.sentTo, function( o ) {
                return o.value ==  item.value;
            });

            if (index > -1) {
                $scope.project.sentTo.splice( index, 1 );
            }
        };


        function newState( state ) {
            alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch ( query ) {
            var results = query ? $scope.states.filter( createFilterFor( query ) ) : $scope.states.filter( createFilterFor() );
            return results;
            /*
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }*/
        }

        var searchText;
        function searchTextChange(text) {
            searchText = $scope.searchText;
        }

        function selectedItemChange( item ) {
            if( item ) {
                $scope.project.sentTo.push( item );

                /* MAX 3 */
                $scope.isDisabled = $scope.project.sentTo.length > 2 ? true : false;

                $scope.searchText = searchText;
            }
        }

        /**
         * Build `states` list of key/value pairs

        function loadAll() {
            var sentTo = [];
            sentTo.push({name: "Murerfirma Bjerregård Pedersen ApS", zip: 8300, city: "Odder", value: 1 });
            sentTo.push({name: "BMB", zip: 8300, city: "Odder", value: 2 });
            sentTo.push({name: "Poul Verner Kristensen", zip: 8300, city: "Odder", value: 3 });
            sentTo.push({name: "Odder Murerforretning", zip: 8300, city: "Odder", value: 4 });
            sentTo.push({name: "JC Tegn og Byg", zip: 8300, city: "Odder", value: 5 });

            return sentTo.map( function ( to ) {
                return {
                    value: to.name.toLowerCase(),
                    display: to.name + " (" + to.zip + " " + to.city  + ") "
                };
            });
        }*/

        /**
         * Create filter function for a query string

        function createFilterFor( query ) {
            console.log( query );

            var lowercaseQuery = angular.lowercase(query);

            return function filterFn( to ) {
                return ( to.name.indexOf( lowercaseQuery ) === 0 );
            };
        }*/

        function loadAll() {
            var allStates = 'Murerfirma Bjerregård Pedersen ApS, Murerfirma Bjerregård Pedersen ApS 1, Murerfirma Bjerregård Pedersen ApS 3, BMB, Poul Verner Kristensen, Odder Murerforretning, JC Tegn og Byg';

            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var start = new Date();
            console.log( "START", start );

            var alreadyExists = function( state ){
                var alreadyExists = _.find( $scope.project.sentTo, function( o ) {
                    return o.value ==  state.value;
                });
                return alreadyExists === undefined ? true : false
            };

            if( query ){
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn( state ) {
                    return ( state.value.indexOf(lowercaseQuery) > -1 && alreadyExists( state ) );
                };
            }else{
                return function filterFn( state ) {
                    return alreadyExists( state );
                };
            }
        }
    }

    $scope.newProject = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../views/henrik/new_project.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
}]);
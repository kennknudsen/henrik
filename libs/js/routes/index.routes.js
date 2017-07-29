'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('listItems', {
        url: '/listItems',
        templateUrl: '../views/admin/listItems.html',
        controller: 'adminListItems',
        resolve: {
            rooms: ['$stateParams', 'Rooms', function( $stateParams, Rooms ){
                return Rooms.requestRooms().then(function ( response ) {
                    Rooms.setRooms( response.rooms );
                    return response.rooms;
                });
            }],
            items: ['Items', function( Items ){
                return Items.getItems().then(function ( response ) {
                    Items.set_global_scope( response.items );
                    return;
                });
            }]
        }
    })


    .state('user', {
        url: '/',
        templateUrl: '../views/henrik/user.html'
    })
    .state('app', {
        url: '/henrik',
        abstract: true,
        templateUrl: '../views/henrik/henrik.html',
        controller: 'appCtrl',
        resolve: {
            user: ['User', function( User ){
                return User.getUser().then(function ( response ) {
                    User.setUser( response.user );
                    /*User.set_global_scope( response.user )*/
                    return response.user;
                });
            }],
            items: ['Items', function( Items ){
                return Items.getItems().then(function ( response ) {
                    Items.set_global_scope( response.items );
                    return;
                });
            }],
            projects: ['Projects', function( Projects ){
                return Projects.getProjects().then(function ( response ) {
                    Projects.set_global_scope( response.projects );
                    Projects.redirectToProjects();
                    return response.projects;
                });
            }]
        }
    })
    .state('app.home', {
        url: '',
        resolve: {
            redirect: ['Projects', function( Projects ){
                Projects.redirectToProjects();
                return true;
            }]
        },
        views: {
            'henrik': {
                templateUrl: '../views/henrik/home.html'
            }
        }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/profile/profile.tmpl.html'
            }
        }
    })
    .state('app.rooms', {
        url: '/rooms/{projectId}',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/rooms.html',
                controller: 'HenrikCtrl_rooms'
            }
        },
        resolve: {
            rooms: ['$stateParams', 'Rooms', function( $stateParams, Rooms ){
                return Rooms.requestRooms().then(function ( response ) {
                    Rooms.setRooms( response.rooms );
                    return response.rooms;
                });
            }],
            responses: ['$stateParams', 'Projects', function( $stateParams, Projects ){
                return Projects.getResponsesForRooms( $stateParams.projectId, "593a567c0c2ef31180fda546" ).then(function ( response ) {
                    //Projects.set_global_scope( response.projects )
                    return response.response;
                });
            }]
        }
    })
    .state('app.byId', {
        url: '/questions/{projectId}/{itemId}/{grandParent}',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/template.html',
                controller: 'HenrikCtrl'
            }
        },
        resolve: {
            responses: ['$rootScope', '$stateParams', 'Projects', function( $rootScope, $stateParams, Projects ){
                return Projects.getResponses( $stateParams ).then(function ( response ) {
                    console.log("response.response fra route", response.response)

                    //Projects.set_global_scope( response.projects )
                    return response.response;
                });
            }]
        }
    })
    .state('app.sent', {
        url: '/sent', /*/{projectId}*/
        views: {
            'henrik': {
                templateUrl: '../views/henrik/sent.html',
                controller: 'sentCtrl'
            }
        }
    })
    .state('app.projects', {
        url: '/projects',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/projects.html'
            }
        }
    })
    .state('app.ended_projects', {
        url: '/ended_projects',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/ended-projects.html'
            }
        }
    })
    .state('app.haand_newproject', {
        url: '/haand_newproject',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/haandvaerker/new_project.html'
            }
        }

    })
    .state('app.haand_projects', {
        url: '/haand_projects',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/haandvaerker/haand_projects.html'
            }
        }

    })
    .state('app.haand_project', {
        url: '/haand_project',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/haandvaerker/haand_project.html'
            }
        }

    })
    .state('app.haand_workPaper', {
        url: '/haand_workPaper',
        views: {
            'henrik': {
                templateUrl: '../views/henrik/haandvaerker/haand_workPaper.html'
            }
        }

    })
});
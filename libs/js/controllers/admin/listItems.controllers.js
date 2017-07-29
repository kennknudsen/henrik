'use strict';

app.controller('adminListItems', ['$scope', 'rooms', 'Items', function( $scope, rooms, Items ) {
    $scope.rooms = rooms;
    $scope.items = Items.get_global_scope();
    $scope.id_unique = true;
    $scope.id_max = 0;

    _.each( $scope.items, function( item ){
        if( item.id > $scope.id_max ){ $scope.id_max = item.id }
        if( _.filter( $scope.items, { id: item.id } ).length > 1 ){
            $scope.id_unique = false;
        }
    });
}]);


app.filter('inParent', ['$filter', function( $filter ){
    return function( items, parentId, grandParentID ){
        return $filter("filter")( items, function( item ){

            if( item.grandParent.length > 0 ){
                return item.parent.indexOf( parentId ) != -1 && _.includes( item.grandParent, grandParentID );
            }else{
                return item.parent.indexOf( parentId ) != -1;
            }
        });

    };
}]);

app.directive('buildTree', function() {
    return {
        restrict:'E',
        replace: 'true',
        templateUrl: '../views/admin/buildTree.html',
        scope: {
            parent: "=parent",
            items: "=items"
        }
    };
});
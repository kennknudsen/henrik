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
    return function( items, parentId, roomID, grandParentID ){
        console.log("HER 1", parentId, roomID, grandParentID);

        return $filter("filter")( items, function( item ){
            if( item.room.length > 0 ){

                if( item.parent.indexOf( parentId ) != -1 && _.includes( item.room, roomID ) ) {
                    // FUNCTION
                    if( item.grandParent.length > 0 ){
                        console.log("HER")
                        return _.includes( item.grandParent, grandParentID );
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            }else{
                if( item.parent.indexOf( parentId ) != -1 ) {
                    // FUNCTION
                    if( item.grandParent.length > 0 ){
                        //console.log("HER 1", item.grandParent, parentId, roomID, grandParentID);
                        return _.includes( item.grandParent, grandParentID );
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
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
            grandParent: "=grandParent",
            room: "=room",
            items: "=items"
        }
    };
});
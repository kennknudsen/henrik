'use strict';

var path = require('path');
var appDir = path.dirname(require.main.filename);

var Rooms_DB = require( path.join( appDir, '../models/db/rooms.db' ) );

var Room = function() {


    return {
        GET_ROOMS: function (req, res, next) {
            Rooms_DB.find({}, function( err, rooms ) {
                if ( err ) {
                    err.logger({ msg: { internal: 'Moongose: delete project - delete project failed' }, id: 10002, project: projectId } );
                    return next( err )
                }

                req.sendResponse({ rooms: rooms });
            });
        }
    }
}();

module.exports = Room;
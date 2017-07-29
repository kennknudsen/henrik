var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');


var path = require('path');
var appDir = path.dirname(require.main.filename);

var Projects_DB = require( path.join( appDir, '../models/db/projects.db' ) );


var Global = require( path.join( appDir, '../models/global/global' ) );

var cleanOutput = function( output, properties ){
    return _.map( output, _.partialRight(_.pick, properties ));
};

/* GET home page. */
router.route('/')
    .get(function( req, res, next ) {
        var projects = _.map( req.session.user.projects, 'project' );

        Projects_DB.find( { '_id': { $in: projects } }, function ( err, projects ) {

            if( err ){
                err.logger = { msg: { internal: 'Moongose: get projects - search for projects failed ', id: 10001 } };
                return next( err );
            }

            res.json({
                success: true,
                projects: Global.MERGE_BY_PROPERTIES( cleanOutput( req.session.user.projects, [ "notViewed", "new", "project" ]) , cleanOutput( projects, [ "_id", "title", "owner", "address", "description", "started", "sent", "ended" ] ), "project", "_id" )
            });
        });
    })
    .post(function( req, res, next ) {

        var address = JSON.parse( req.body.address );

        var project = new Projects_DB();
        project.address = {};

        project.title = req.body.title;
        project.address.address = address.address;
        project.address.zip = address.zip;
        project.address.city = address.city;
        project.description = req.body.description;
        project.owner = {
            firstName: "Kenn",
            lastName: "Knudsen"
        };


        var saveProject = function( callback ){
            project.save( function( err, doc ){
                if( err ){
                    err.logger = { msg: { internal: 'Moongose: post project - save new project failed ', id: 10002, error: err } };
                    return callback( err );
                }

                callback( null, doc );
             });
         };
        var saveProjectToUserObject = function( doc, callback ){
            req.session.user.projects.push( { project: doc._id });
            req.session.user.save( function( err ){

                if( err ){
                    err.logger = { msg: { internal: 'SESSION: post project - save new project in user object failed ', id: 10003, error: err } };
                    return callback( err );
                }

                callback( null, doc );
            });
        };

        async.waterfall([
            saveProject,
            saveProjectToUserObject
        ],
        function( err, results ) {
            if( err ) { return next( err ); }

            res.json({
                success: true,
                project: results
            });
            req.logUserActivity( { id: 10001, action: req.__('log_projects_newProject'), userId: req.session.user._id } );
        });
    });




//SANITIZE INPUT TOO
var project = require( path.join( appDir, '../models/projects/project' ) );



//var project = new Project(); // KAN DENNE UNDGÅES SOM VED VALIDATE
// csrfProtection

router.route('/:projectId')
    .all( project.SET_PROJECT_ID, project.PROJECT_IS_IN_USER_OBJECT )
    .get( project.GET )
    .put( project.SET_PROJECT_ADDRESS_OPT,
          project.SET_PROJECT_ZIP_OPT,
          project.SET_PROJECT_CITY_OPT,
          project.PUT)


    // VI SKAL IKKE SLETTE PROJEKT => ANONYMISER + FJERN FRA USEROBJECT (PROPERTY = DELETED)
    // VALIDATE INPUT
    // INPUT OBEJCT
    .delete( project.DELETE );

router.route('/:projectId/workPaper')
    .all( project.SET_PROJECT_ID, project.PROJECT_IS_IN_USER_OBJECT )
    .get( project.GET_WORKPAPER, function( req, res, next ){

        /* INPUT */
        var project = req.results.project;

        /* SETUP */
        console.log("PDF");
        var PDFDocument = require('pdfkit');
        var doc;
        doc = new PDFDocument();

        var font = "Helvetica";
        var fontBold = "Helvetica-Bold";
        // Set some headers
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Header to force download
        res.setHeader('Content-disposition', 'attachment; filename=Tilbudsbeskrivelse.pdf');
        doc.pipe(res);

        /* TEST */
        var string = "";
        for(var i = 0; i <50; i++){
            string += " " + project.description
        }

        var questions = [
            { _id: "5946bed9f9a37324a008bd98", id:1, text: "Ønskes ændring af", type: "list", parent: [ "r1", "r2", "r3", "r4"], section: true, required: true, other: { type: 1 }, length: 5, help: "Hjælpe sektion 1" },
            { _id: "5946bed9f9a37324a008bd00", id:2, text: "Gulv", type: "boolean", parent: 1, grandParent: [ "r1" ] },
            { _id: "5946bed9f9a37324a008bd01", id:3, text: "Vægge", type: "boolean", parent: 1, grandParent: [ "r1", "r2" ] },
            { _id: "5946bed9f9a37324a008bd02", id:4, text: "Loft - virker ikke", type: "boolean", parent: 1, grandParent: [ "r1", "r2", "r3"] },
            { _id: "5946bed9f9a37324a008bd03", id:5, text: "Vinduer - virker ikke", type: "boolean", parent: 1, grandParent: [ "r1", "r2", "r3"] }
        ];


        /* HELP FUNCTIONS */
        var section = function( title, text, marginLeft, marginRight, propertiess ){
            textAdded = title + " (fortsat)";

            doc.moveDown();
            doc.font( fontBold ).text( title, marginLeft, marginRight, propertiess );
            //doc.lineTo(100, 100)        //end point
            //.dash(5, {space: 10})   //adding dash
            //.stroke();
            doc.moveDown(0.5);

            _.each( text, function( t ){
                doc.font( font ).text( t );
            });

            doc.moveDown();
            textAdded= "";
        };

        // IF LONG TEXT - SET CONTINUED TEXT
        var textAdded = "";
        doc.on('pageAdded', function () {
            doc.font( fontBold ).text( textAdded, 100, 100 );
            doc.font( font ).text( " " );
        });


        /* FRONTPAGE */
        //.font('fonts/PalatinoBold.ttf')
        doc.image("public\\" + req.settings.global.logo.base, 0, 15);         // SKAL NOK VÆRE GET LOGO PATH ISTEDET (SCRIPT)s
        doc.fontSize(50).text('Tilbudsbeskrivelse', 100, 100);


        doc.addPage();
        doc.fontSize(25).text('Projektbeskrivelse', 100, 100);
        doc.fontSize(13);

        //  ETC

        // PROJECT TITLE
        doc.moveDown();
        section( 'Adresse', [ project.address.address, project.address.zip + " " + project.address.city ], 100, 200, { width: 160 } );
        section( 'Ejer', [ project.owner.firstName + " " + project.owner.lastName ], 320, 200, { width: 160 } );


        //doc.text("ABC", 100, 200, { width: 160 })
        //doc.text("DEF", 320, 200, { width: 160 })

        //doc.text(string, 100, 300)



        section( 'Projekttitel', [ project.title ], 100, 300 );
        section( 'Projektbeskivelse', [ string ] );





        // GLBOAL
        var rooms = _.filter( project.responses, { rooms: true })[0];       // FIND
        var top;

        _.each( rooms.answer, function( answer ){
            if( answer.value === true ){
                doc.addPage();
                doc.fontSize(25).text('RUM' + answer.id);


                var q = _.filter( questions, { id: 1 });        //FIND    IKKE RIGTIG -> skal hente R1, R2 etc i parten array


                var answ = _.find( project.responses, { parent: answer.id });
                if( answ ){
                    answ = answ.answer;
                }



                doc.fontSize(15);
                doc.font( fontBold ).text( q[0].text );

                var q1 = _.filter( questions, { parent: 1 });         //IKKE RIGTIG


                doc.font( font );

                _.each( q1, function( q1q, index ){
                    var a = "nej";

                    if( answ ){
                        var someVar1 = _.find( answ, { id: q1q.id.toString() });
                        if( someVar1 ){
                            a = someVar1.value ? "ja" : "nej";
                        }

                    }


                    top = 200 + Math.floor( index / 2 ) * 20;

                    if( index % 2 == 0 ){
                        doc.text( q1q.text, 100, top, { width: 130 } );
                        doc.text( a, 230, top, { width: 30 } );
                    }else{
                        doc.text( q1q.text, 320, top, { width: 130 } );
                        doc.text( a, 450, top, { width: 30 } );
                    }
                })
            }
        });

        doc.moveDown();
        doc.text( "BLABLABLA", 100, top + 20 );

        doc.addPage();
        doc.addPage();
        doc.addPage();
        doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

        doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();

        doc.addPage().fillColor('blue').text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
            color: '#0000FF'
        }).link(100, 100, 160, 27, 'http://google.com/');

        doc.end();

    });

router.route('/:projectId/response/:responseId')
/*.all( project.SET_PROJECT_ID, project.SET_RESPONSE_ID, project.PROJECT_IS_IN_USER_OBJECT )
    .get( project.GET_RESPONSES )
   .post( project.SET_PROJECT_RESPONSE,
           project.POST_RESPONSES )
    .put( project.SET_PROJECT_RESPONSE,
          project.PUT_RESPONSE)*/
    .delete( project.DELETE_RESPONSE, function( req, res, next ) {});

router.route('/:projectId/response/:responseId/:room')
    .all( project.SET_PROJECT_ID, project.SET_RESPONSE_ID, project.SET_ROOM, project.PROJECT_IS_IN_USER_OBJECT )
    .get( project.GET_RESPONSES )
    .post( project.SET_PROJECT_RESPONSE,
        project.POST_RESPONSES );
module.exports = router;




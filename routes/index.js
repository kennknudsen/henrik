var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var moment = require('moment');



/* GET home page. */
router.get('/', function( req, res ) {
    console.log( "USER", req.session.user );
    res.render('index' );
});

router.get('/test', function( req, res ) {
    console.log( "USER", req.session.user );
    res.json({ test: true });
});

/*
router.get('/rooms', function( req, res ) {
    res.render( 'rooms' );
});

router.get('/room', function( req, res ) {
  res.render( 'room' );
});

router.get('/budget', function(req, res, next) {
    res.render('budget', { title: 'Express' });
});

router.get('/navigation', function(req, res, next) {
    res.render('navigation');
});

router.get('/betaling', function(req, res, next) {
    res.render('betaling');
});


router.get('/upload', function(req, res, next) {
    res.render('upload');
});

router.post('/upload', function(req, res){

    //TO DO - WHITELIST AF FILER

    var storeFileName = [];
    // create an incoming form object
    var form = new formidable.IncomingForm();


    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory

    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name

    form.on('file', function(field, file) {
        var fileName = "U" + req.user.id + "_D" + moment().format('YYYY_MM_DD_HHmmss') + "_R" + Math.random() + "_!_" + file.name;

        var newPath = path.join(form.uploadDir, String( req.user.id ) );
        mkdirp( newPath , function (err) {
            if (err) console.error(err)
            else console.log('pow!')
            storeFileName.push( file.name );
            console.log(storeFileName)
            fs.rename( file.path, path.join(newPath, fileName));

        });
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse( req );

});


router.get('*', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
*/

module.exports = router;

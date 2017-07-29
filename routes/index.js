var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var mkdirp = require('mkdirp');

/* GET home page. */
router.get('/', function( req, res ) {
    console.log( "USER", req.session.user );
    res.render('index' );
});

router.get('/test', function( req, res ) {
    console.log( "USER", req.session.user );
    res.json({ test: true });
});

module.exports = router;

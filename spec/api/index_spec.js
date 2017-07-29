'use strict';

var frisby = require('frisby');

var statusSucces = 200;

var historyShort = frisby.create('GET /test')
    .get("http://localhost:3003/test")
    .inspectJSON()
    .expectStatus(statusSucces)
    .expectHeaderContains('content-type', 'application/json')
    .expectHeaderContains('content-type', 'charset=utf-8')
    .expectJSONLength( 1 )
    .expectJSON( {
        test:true
    });

historyShort.toss();


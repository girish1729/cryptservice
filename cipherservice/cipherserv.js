var express = require('express')
var cors = require('cors');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var bodyParser = require('body-parser')
var email = require('emailjs');
var exec = require('child_process')
    .exec;

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';


var db = null;

function dbconn() {
    var pgp = require('pg-promise')(options);
    var connectionString = 'postgres://postgres:@localhost:5432/in2nsamples';
    db = pgp(connectionString);
}

dbconn();


createsecret = function (plaintext) {
    return encrypt(plaintext);
};


verify_cryptdata = function (secret, codedid, res, next) {

    var idblob = decrypt(secret);
    var arr = idblob.split(',');
    var user_id = arr[0];

    var ourhash = hashid(idblob);

    if (ourhash !== codedid) {
        console.log("Verify failed");
        return res.status(401)
            .send("Bad verify data");
    }
    console.log("Decrypt succeeded");
    console.log(user_id);
    return res.status(200)
        .json({
            user_id: user_id
        });
}

/******************** XXX Start endpoints **************/

/* XXX catch all */
app.all('*', function (req, res, next) {
    console.log(req.path);
    next();
});

/* R of cRud XXX */

app.get('/decryptverify/:secret/:hash', function (req, res, next) {
    var secret = req.params.secret;
    var codedid = req.params.hash;
    verify_cryptdata(secret, codedid, res, next);
});


/* XXX Start express listen */

app.listen(5000, function() {
console.log("DB server listening at 5000");
});

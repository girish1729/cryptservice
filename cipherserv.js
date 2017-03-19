
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
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


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.all('/*', function(req, res, next){
  console.log("URL:: " + req.path);
  console.log("Method:: " + req.method);
    next();
});

var dbobj = {};

app.post('/api/create', function (req, res, next) {
    n = req.body.name;
    console.log(n);
    dbobj.name = n;
    res.status(200).json({status: "Created"});
    next();
});

app.get('/decryptverify/:secret/:hash', function (req, res, next) {
    var secret = req.params.secret;
    var codedid = req.params.hash;
    verify_cryptdata(secret, codedid, res, next);
});


app.get('/*', function(req, res, next){
  res.sendFile(__dirname + '/public/index.html');
});

var port = 2030;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});


